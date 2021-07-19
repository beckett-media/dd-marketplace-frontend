import React, { Component } from 'react';
import Link from 'next/link';
import FormChangeUserInformation from '~/components/shared/FormChangeUserInformation';
import { getUserInfo } from '~/store/auth/selectors';
import { connect } from 'react-redux';
import AvatarUpload from '~/components/shared/upload/AvatharUpload';

const UserInformation = (props) => {
    const accountLinks = [
        {
            text: 'Account Information',
            url: '/account/user-information',
            icon: 'icon-user',
            active: true,
        },
        {
            text: 'Notifications',
            url: '/account/notifications',
            icon: 'icon-alarm-ringing',
            disabled: true,
        },
        {
            text: 'Invoices',
            url: '/account/invoices',
            icon: 'icon-papers',
            disabled: true,
        },
        {
            text: 'Address',
            url: '/account/addresses',
            icon: 'icon-map-marker',
            disabled: true,
        },
        {
            text: 'Recent Viewed Product',
            url: '/account/recent-viewed-product',
            icon: 'icon-store',
            disabled: true,
        },
        {
            text: 'Wishlist',
            url: '/account/wishlist',
            icon: 'icon-heart',
            disabled: true,
        },
    ];

    //Views
    const accountLinkView = accountLinks.map((item) => (
        <li key={item.text} className={item.active ? 'active' : ''}>
            <Link href={item.url}>
                <a>
                    <i className={item.icon}></i>
                    {item.text}
                </a>
            </Link>
        </li>
    ));

    return (
        <section className="ps-my-account ps-page--account">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="ps-section__left">
                            <aside className="ps-widget--account-dashboard">
                                <div className="ps-widget__header">
                                    <img src="/static/img/users/3.jpg" />
                                    <figure>
                                        <figcaption>Hello</figcaption>
                                        <p>username@gmail.com</p>
                                    </figure>
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
                                                              cursor:
                                                                  'not-allowed',
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
                                            <Link href="/account/my-account">
                                                <a>
                                                    <i className="icon-power-switch"></i>
                                                    Logout
                                                </a>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </aside>
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <div className="ps-page__content">
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
