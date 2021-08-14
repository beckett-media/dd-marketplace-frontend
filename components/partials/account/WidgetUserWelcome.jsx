import React from 'react';
import { useSelector } from 'react-redux';
import { baseUrl } from '~/repositories/Repository';
import { getUserInfo } from '~/store/auth/selectors';
import { Avatar } from 'antd';

const WidgetUserWelcome = ({ dark }) => {
    const userInfo = useSelector(getUserInfo);

    const photo =
        userInfo?.profilePicture && `${baseUrl}/${userInfo.profilePicture}`;

    const name = userInfo?.fullName || userInfo?.username || '';
    console.log('userInfo: ', userInfo);

    return userInfo ? (
        <>
            <div className={`ps-block--user-wellcome ${dark ? 'dark' : ''}`}>
                <div className="ps-block__left">
                    {userInfo?.profilePicture ? (
                        <Avatar size="large" src={photo} alt=""></Avatar>
                    ) : (
                        <Avatar size="large" alt="">
                            {((name || '').charAt(0) || '').toUpperCase()}
                        </Avatar>
                    )}
                </div>
                <div className="ps-block__right">
                    <p>
                        Hello,<a href="/account/user-information">{name}</a>
                    </p>
                </div>
            </div>
        </>
    ) : (
        <></>
    );
};

export default WidgetUserWelcome;
