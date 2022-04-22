import React, { Component } from 'react';
import Link from 'next/link';
import FormChangeUserInformation from '~/components/shared/FormChangeUserInformation';
import { getUserInfo } from '~/store/auth/selectors';
import { connect } from 'react-redux';
import AvatarUpload from '~/components/shared/upload/AvatharUpload';
import { baseUrl } from '~/repositories/Repository';
import { Avatar } from 'antd';
import { logOut } from '~/store/auth/action';

const UserInformation = (props) => {
    const accountLinks = [
        {
            text: 'My Profile',
            url: '/account/user-information',
            icon: 'icon-user',
            active: true,
        },
        // {
        //     text: 'Notifications',
        //     url: '/account/notifications',
        //     icon: 'icon-alarm-ringing',
        //     disabled: true,
        // },
        {
            text: 'Orders',
            url: '/account/orders',
            icon: 'icon-papers',
            disabled: false,
        },
        {
            text: 'My Bids',
            icon: 'icon-papers',
            url: '/account/my-bids',
        },
        // {
        //     text: 'Address',
        //     url: '/account/addresses',
        //     icon: 'icon-map-marker',
        //     disabled: true,
        // },
        // {
        //     text: 'Recent Viewed Product',
        //     url: '/account/recent-viewed-product',
        //     icon: 'icon-store',
        //     disabled: true,
        // },
        // {
        //     text: 'Wishlist',
        //     url: '/account/wishlist',
        //     icon: 'icon-heart',
        //     disabled: true,
        // },
    ];

    const { userInfo = {} } = props;

    const photo = userInfo?.profilePicture
        ? `${baseUrl}/${userInfo.profilePicture}`
        : '/img/user/admin.jpg';

    const name = userInfo?.username || userInfo?.fullName || '';

    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Profile',
        },
    ];

    return (
        <section className="ps-my-account ps-page--account">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="ps-section__left">
                            <aside className="ps-widget--account-dashboard">
                                <div className="ps-widget__header text-center">
                                    <div>
                                        <AvatarUpload
                                            userInfo={userInfo}
                                            profilePhoto={
                                                userInfo?.profilePicture || null
                                            }
                                        />
                                    </div>
                                    <div>
                                        <figure>
                                            <figcaption>
                                                Hello, &nbsp;
                                                {userInfo?.username ||
                                                    userInfo?.fullName ||
                                                    ''}
                                            </figcaption>
                                            <p>{userInfo?.email || ''}</p>
                                        </figure>
                                    </div>
                                </div>
                                <div className="ps-widget__content">
                                    <ul className="ps-list--user-links">
                                        {accountLinks.map((link) => (
                                            <li
                                                style={
                                                    link.disabled
                                                        ? {
                                                              pointerEvents:
                                                                  'none',
                                                              opacity: 0.6,
                                                              cursor: 'not-allowed',
                                                          }
                                                        : {}
                                                }
                                                disabled={link.disabled}
                                                key={link.text}
                                                className={
                                                    link.active ? 'active' : ''
                                                }>
                                                <Link href={link.url}>
                                                    <a>
                                                        <i
                                                            className={
                                                                link.icon
                                                            }></i>
                                                        {link.text}
                                                    </a>
                                                </Link>
                                            </li>
                                        ))}
                                        <li>
                                            <a
                                                onClick={() =>
                                                    props.dispatch(logOut())
                                                }>
                                                <i className="icon-power-switch"></i>
                                                Logout
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </aside>
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <div className="ps-page__content">
                            {/* <BreadCrumb breacrumb={breadCrumb} /> */}
                            <FormChangeUserInformation
                                userInfo={props.userInfo}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const connectStateToProps = (state) => {
    return {
        userInfo: getUserInfo(state),
    };
};

export default connect(connectStateToProps)(UserInformation);
