import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import { Radio, Select, notification } from 'antd';
import ModulePaymentOrderSummary from '~/components/partials/account/modules/ModulePaymentOrderSummary';
import { getUserInfo } from '~/store/auth/selectors';
import { getDefaultAddress } from '~/store/checkout/selectors';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { onCheckoutComplete } from '~/store/checkout/action';

const { Option } = Select;

class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            method: 1,
        };
    }

    handleChangePaymentMethod = (e) => {
        this.setState({ method: e.target.value });
    };

    handleCheckout = (stripetoken) => {
        this.props.dispatch(onCheckoutComplete(stripetoken));
    };

    render() {
        let month = [],
            year = [];
        for (let i = 1; i <= 12; i++) {
            month.push(i);
        }
        for (let i = 2019; i <= 2050; i++) {
            year.push(i);
        }

        const { userInfo = {}, defaultAddress = {} } = this.props;

        return (
            <div className="ps-checkout ps-section--shopping">
                <div className="container">
                    <div className="ps-section__header">
                        <h1>Payment</h1>
                    </div>
                    <div className="ps-section__content">
                        <div className="row">
                            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                                <div className="ps-block--shipping">
                                    <div className="ps-block__panel">
                                        <figure>
                                            <small>Contact</small>
                                            <p>
                                                {userInfo?.email || ''},{' '}
                                                {defaultAddress?.mobile || ''}
                                            </p>
                                            <p></p>
                                            {/* <Link href="/account/checkout">
                                                <a>Change</a>
                                            </Link> */}
                                        </figure>
                                        <figure>
                                            <small>Ship to</small>
                                            <p>
                                                {defaultAddress.streetAddress ||
                                                    ''}
                                                , {defaultAddress.state || ''},
                                                {defaultAddress.city || ''}
                                            </p>
                                            <Link href="/account/checkout">
                                                <a>Change</a>
                                            </Link>
                                        </figure>
                                    </div>
                                    {/* <h4>Shipping Method</h4>
                                    <div className="ps-block__panel">
                                        <figure>
                                            <small>
                                                International Shipping
                                            </small>
                                            <strong>$20.00</strong>
                                        </figure>
                                    </div> */}
                                    <h4>Payment Methods</h4>
                                    <div className="ps-block--payment-method">
                                        {/* <div className="ps-block__header">
                                            <Radio.Group
                                                onChange={e =>
                                                    this.handleChangePaymentMethod(
                                                        e
                                                    )
                                                }
                                                value={this.state.method}>
                                                <Radio value={1}>
                                                    Visa / Master Card
                                                </Radio>
                                                <Radio value={2}>Paypal</Radio>
                                            </Radio.Group>
                                        </div> */}
                                        <div className="ps-block__content">
                                            <CheckoutForm
                                                handleCheckout={
                                                    this.handleCheckout
                                                }
                                            />
                                            {/* {this.state.method === 1 ? (
                                                <div className="ps-block__tab">
                                                    <div className="form-group">
                                                        <label>
                                                            Card Number
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>
                                                            Card Holders
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                        />
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-8">
                                                            <div className="form-group">
                                                                <label>
                                                                    Expiration
                                                                    Date
                                                                </label>
                                                                <div className="row">
                                                                    <div className="col-6">
                                                                        <Select
                                                                            defaultValue={
                                                                                1
                                                                            }>
                                                                            {month.map(
                                                                                (
                                                                                    item
                                                                                ) => (
                                                                                    <Option
                                                                                        value={
                                                                                            item
                                                                                        }
                                                                                        key={
                                                                                            item
                                                                                        }>
                                                                                        {
                                                                                            item
                                                                                        }
                                                                                    </Option>
                                                                                )
                                                                            )}
                                                                        </Select>
                                                                    </div>
                                                                    <div className="col-6">
                                                                        <Select
                                                                            defaultValue={
                                                                                2020
                                                                            }>
                                                                            {year.map(
                                                                                (
                                                                                    item
                                                                                ) => (
                                                                                    <Option
                                                                                        value={
                                                                                            item
                                                                                        }
                                                                                        key={
                                                                                            item
                                                                                        }>
                                                                                        {
                                                                                            item
                                                                                        }
                                                                                    </Option>
                                                                                )
                                                                            )}
                                                                        </Select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-4">
                                                            <div className="form-group">
                                                                <label>
                                                                    CVV
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <button className="ps-btn ps-btn--fullwidth">
                                                            Submit
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="ps-block__tab">
                                                    <a className="ps-btn">
                                                        Process with Paypal
                                                    </a>
                                                </div>
                                            )} */}
                                        </div>
                                    </div>
                                    <div className="ps-block__footer">
                                        <Link href="/account/shipping">
                                            <a>
                                                <i className="icon-arrow-left mr-2"></i>
                                                Return to shipping
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 ">
                                <div className="ps-form__orders">
                                    <ModulePaymentOrderSummary />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const connectStateToProps = (state) => {
    return {
        userInfo: getUserInfo(state),
        defaultAddress: getDefaultAddress(state),
    };
};

export default connect(connectStateToProps)(Payment);

const StripeHoc = (WrappedComponent) => (props) => {
    const stripePromise = loadStripe(
        'pk_test_51HDEqSDZO5dpgj2KwmQY26irjAt1GBg2I2iEy90NUuHHyQefpMwyxeKCN2opBwiOXD6gAYjEe106kG4eWreUZYO9005Ys9lGdc'
    );
    return (
        <Elements stripe={stripePromise}>
            <WrappedComponent {...props} />
        </Elements>
    );
};

const CheckoutForm = StripeHoc(({ handleCheckout }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const cardElement = elements.getElement(CardElement);

        // Use your card Element with other Stripe.js APIs
        const { error, token } = await stripe.createToken(cardElement);

        if (error) {
            notification.error({
                message: 'Validation failed',
                description: error.message,
            });
        } else {
            handleCheckout(token.id);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe}>
                Pay
            </button>
        </form>
    );
});
