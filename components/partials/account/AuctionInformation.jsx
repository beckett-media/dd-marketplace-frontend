import React from 'react';
import { connect } from 'react-redux';
import { logOut } from '~/store/auth/action';
import { getUserInfo } from '~/store/auth/selectors';
import TableBids from './modules/TableBids';
import Link from 'next/link';
import AvatarUpload from '~/components/shared/upload/AvatharUpload';

const AuctionInformation = (props) => {
    const accountLinks = [
        {
            text: 'My Profile',
            url: '/account/user-information',
            icon: 'icon-user',
        },
        {
            text: 'Orders',
            url: '/account/orders',
            icon: 'icon-papers',
        },
        {
            text: 'My Bids',
            url: '/account/my-bids',
            icon: 'icon-papers',
            active: true,
        },
    ];

    const { biddedAuctions, userInfo = {} } = props;

    return (
        <section className="ps-my-account ps-page--account">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="ps-section__left">
                            <aside className="ps-widget--account-dashboard">
                                <div className="ps-widget__header">
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
                                            <a
                                                onClick={() =>
                                                    this.props.dispatch(
                                                        logOut()
                                                    )
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
                            <div className="ps-section--account-setting">
                                <div className="ps-section__header">
                                    <h3>My Auctions</h3>
                                </div>
                                <div className="ps-section__content orders-table">
                                    <TableBids
                                        list={biddedAuctions}
                                        userId={userInfo.id}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const connetStateToProps = (state) => {
    return {
        userInfo: getUserInfo(state),
    };
};

export default connect(connetStateToProps)(AuctionInformation);
