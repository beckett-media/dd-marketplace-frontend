import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { login, logOut } from '~/store/auth/action';
import {
    sellerDashboardDomain,
    sellerDashboardURL,
} from '~/repositories/Repository';

const CrossOriginLogin = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        document.domain = sellerDashboardDomain;
        window.addEventListener(
            'message',
            (event) => {
                if (event.origin.startsWith(sellerDashboardURL)) {
                    var payload = JSON.parse(event.data);
                    if (payload.action === 'login')
                        dispatch(login({ tokens: payload.tokens }));
                    if (payload.action === 'logout') dispatch(logOut());
                } else {
                    return;
                }
            },
            []
        );
    });

    return null;
};

export default CrossOriginLogin;
