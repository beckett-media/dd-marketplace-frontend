import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import { logOut } from '../../../../store/auth/action';
import { Dropdown, Menu } from 'antd';
class AccountQuickLinks extends Component {
    constructor(props) {
        super(props);
    }

    handleLogout = (e) => {
        e.preventDefault();
        this.props.dispatch(logOut());
    };

    render() {
        console.log('MOBILE');

        const accountLinks = [
            {
                text: 'My Profile',
                url: '/account/user-information',
            },
            // {
            //     text: 'Notifications',
            //     url: '/account/notifications',
            // },
            {
                text: 'Orders',
                url: '/account/orders',
            },
            {
                text: 'My Bids',
                url: '/account/my-bids',
            },
            {
                text: 'Stores',
                url: '/stores',
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
        const menu = (
            <Menu>
                {accountLinks.map((link) => (
                    <Menu.Item key={link.url}>
                        <Link href={link.url}>
                            <a>{link.text}</a>
                        </Link>
                    </Menu.Item>
                ))}

                <Menu.Item>
                    <a onClick={this.handleLogout.bind(this)}>Logout</a>
                </Menu.Item>
            </Menu>
        );

        return (
            <Dropdown overlay={menu} placement="bottomLeft" trigger={['click']}>
                <a className="header__extra ps-user--mobile">
                    <i className="icon-user"></i>
                </a>
            </Dropdown>
        );
    }
}
const mapStateToProps = (state) => {
    return state;
};
export default connect(mapStateToProps)(AccountQuickLinks);
