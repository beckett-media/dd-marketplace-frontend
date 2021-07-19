import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getInvoicesRequest } from '~/store/invoices/actions';
import { getOrders } from '~/store/invoices/selectors';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import TableInvoices from './modules/TableInvoices';

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
            {
                text: 'Notifications',
                url: '/account/notifications',
                icon: 'icon-alarm-ringing',
            },
            {
                text: 'Invoices',
                url: '/account/invoices',
                icon: 'icon-papers',
                active: true,
            },
            {
                text: 'Address',
                url: '/account/addresses',
                icon: 'icon-papers',
            },
            {
                text: 'Recent Viewed Product',
                url: '/account/recent-viewed-product',
                icon: 'icon-papers',
            },
            {
                text: 'Wishlist',
                url: '/account/wishlist',
                icon: 'icon-papers',
            },
        ];

        const { orders } = this.props;
        console.log('orders: Render', orders);

        return (
            <section className="ps-my-account ps-page--account">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="ps-page__left">
                                <AccountMenuSidebar data={accountLinks} />
                            </div>
                        </div>
                        <div className="col-lg-8">
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
    };
};

export default connect(connetStateToProps)(Invoices);
