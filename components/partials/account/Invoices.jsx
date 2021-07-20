import Avatar from 'antd/lib/avatar/avatar';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logOut } from '~/store/auth/action';
import { getUserInfo } from '~/store/auth/selectors';
import { getInvoicesRequest } from '~/store/invoices/actions';
import { getOrders } from '~/store/invoices/selectors';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import TableInvoices from './modules/TableInvoices';
import Link from 'next/link';

class Invoices extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.dispatch(getInvoicesRequest());
    }

    render() {
        const accountLinks = [
            {
                text: 'Account Information',
                url: '/account/user-information',
                icon: 'icon-user',
            },
            // {
            //     text: 'Notifications',
            //     url: '/account/notifications',
            //     icon: 'icon-alarm-ringing',
            // },
            {
                text: 'Invoices',
                url: '/account/invoices',
                icon: 'icon-papers',
                active: true,
            },
            // {
            //     text: 'Address',
            //     url: '/account/addresses',
            //     icon: 'icon-papers',
            // },
            // {
            //     text: 'Recent Viewed Product',
            //     url: '/account/recent-viewed-product',
            //     icon: 'icon-papers',
            // },
            // {
            //     text: 'Wishlist',
            //     url: '/account/wishlist',
            //     icon: 'icon-papers',
            // },
        ];

        const { orders, userInfo = {} } = this.props;

        const photo = userInfo?.profilePicture
            ? `${baseUrl}/${userInfo.profilePicture}`
            : '/img/user/admin.jpg';

        const name = userInfo?.username || userInfo?.fullName || '';
        return (
            <section className="ps-my-account ps-page--account">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="ps-section__left">
                                <aside className="ps-widget--account-dashboard">
                                    <div className="ps-widget__header">
                                        <Avatar
                                            size="large"
                                            src={
                                                photo
                                                    ? photo
                                                    : (
                                                          (name || '').charAt(
                                                              0
                                                          ) || ''
                                                      ).toUpperCase()
                                            }
                                            alt=""
                                        />

                                        <figure>
                                            <figcaption>
                                                Hello &nbsp;
                                                {userInfo?.username ||
                                                    userInfo?.fullName ||
                                                    ''}
                                            </figcaption>
                                            <p>{userInfo?.email || ''}</p>
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
                                                        link.active
                                                            ? 'active'
                                                            : ''
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
                            {/* <div className="ps-page__left">
                                <AccountMenuSidebar data={accountLinks} />
                            </div> */}
                        </div>
                        <div className="col-lg-9">
                            <div className="ps-page__content">
                                <div className="ps-section--account-setting">
                                    <div className="ps-section__header">
                                        <h3>Invoices</h3>
                                    </div>
                                    <div className="ps-section__content">
                                        <TableInvoices orders={orders} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

const connetStateToProps = (state) => {
    return {
        orders: getOrders(state),
        userInfo: getUserInfo(state),
    };
};

export default connect(connetStateToProps)(Invoices);
