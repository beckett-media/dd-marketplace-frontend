import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isUserAuthenticated, getUserInfo } from '~/store/auth/selectors';
import { getUserDetails } from '~/store/userInfo/action';
import { getUserInfoLoading } from '~/store/userInfo/selectors';
import Router from 'next/router';
import { Skeleton } from 'antd';

const Wrapper = (WrappedComponent) => {
    return (props) => {
        const [isAuthenticated, loading] = checkUserAuthentication();
        if (loading) return <Skeleton />;
        if (isAuthenticated && !loading) return <WrappedComponent {...props} />;
        else return <GoToLogin />;
    };
};

export default Wrapper;

const checkUserAuthentication = () => {
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(getUserDetails());
    }, []);
    const isAuthenticated = useSelector(isUserAuthenticated);
    const userInfoLoading = useSelector(getUserInfoLoading);
    return [isAuthenticated, userInfoLoading];
};

const GoToLogin = () => {
    React.useEffect(() => {
        Router.push('/account/login');
    }, []);

    return <React.Fragment />;
};
