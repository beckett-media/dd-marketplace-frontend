import React from 'react';
import { connect, useDispatch } from 'react-redux';
import Link from 'next/link';
import { logOut } from '~/store/auth/action';
import { appName, sellerDashboardURL } from '~/repositories/Repository';
import SimpleCrypto from "simple-crypto-js";
var simpleCrypto = new SimpleCrypto("myTotalySecretKey");

import {
    PoweroffOutlined,
    ProfileOutlined,
    UserOutlined,
    ShoppingOutlined,
    ShopOutlined
} from '@ant-design/icons';

import WidgetUserWelcome from '~/components/partials/account/WidgetUserWelcome';

const AccountQuickLinks = (props) => {
    const dispatch = useDispatch();
    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logOut());
    };
    const accountLinks = [
        {
            text: 'My Profile',
            url: '/account/user-information',
            icon: <UserOutlined />,
        },
        // {
        //     text: 'Notifications',
        //     url: '/account/notifications',
        // },

        {
            text: 'Orders',
            url: '/account/orders',
            icon: <ProfileOutlined />,
        },
        {
            text: 'Stores',
            url: '/stores',
            icon: <ShopOutlined />,
        },
        {
            text: 'Switch to Selling',
            action:(e)=>{
              e.preventDefault()
              let data = JSON.stringify({
                xAuthToken: localStorage.getItem(`${appName}_xAuthToken`),
                refreshToken: localStorage.getItem(`${appName}_refreshToken`),
              })
              var encryptedData = simpleCrypto.encrypt(data); 
              window.location.href=`${sellerDashboardURL}/?auth=${encodeURIComponent(encryptedData)}`
            },
            icon: <ShoppingOutlined />,
        },
        // {
        //     text: 'Address',
        //     url: '/account/addresses',
        // },
        // {
        //     text: 'Recent Viewed Product',
        //     url: '/account/recent-viewed-product',
        // },
        // {
        //     text: 'Wishlist',
        //     url: '/account/wishlist',
        // },
    ];
    const { isLoggedIn } = props;

    // View
    const linksView = accountLinks.map((item) => (
        <li key={item.text}>
            <i>{item.icon}</i>
            {item.url ? <Link href={item.url}>
                <a>{item.text}</a>
            </Link>: <a href="#" onClick={item.action}>{item.text}</a>}
        </li>
    ));

    if (isLoggedIn === true) {
        return (
            <div className="ps-block--user-account">
                <i className="icon-user"></i>
                <div className="ps-block__content">
                    <ul className="ps-list--arrow">
                        <li>
                            <WidgetUserWelcome dark />
                        </li>
                        {linksView}
                        <li className="ps-block__footer">
                            <i>
                                <PoweroffOutlined />
                            </i>
                            <a href="#" onClick={(e) => handleLogout(e)}>
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    } else {
        return (
            <div className="ps-block--user-header">
                <div className="ps-block__left">
                    <i className="icon-user"></i>
                </div>
                <div className="ps-block__right">
                    <Link href="/account/login">
                        <a>Login</a>
                    </Link>
                    <Link href="/account/register">
                        <a>Register</a>
                    </Link>
                </div>
            </div>
        );
    }
};

export default connect((state) => state)(AccountQuickLinks);
