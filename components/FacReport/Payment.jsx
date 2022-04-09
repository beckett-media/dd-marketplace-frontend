import React, { Component } from 'react';
import { notification, Spin, Row, Form, Input } from 'antd';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import Link from 'next/link';
import { CONFIG } from '../../constants/Config';

class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            method: 1,
            checkoutCompleteProgress: false,
        };
    }

    handleChangePaymentMethod = (e) => {
        this.setState({ method: e.target.value });
    };

    handleCheckout = async (token, cardId, values) => {
        this.setState({ checkoutCompleteProgress: true });
        const customHeaders = {
            Accept: 'application/json',
            'content-type': 'application/json',
            'x-app-token': CONFIG['x-app-token'],
        };
        try {
            const request = await axios.post(
                `${CONFIG.base_url}/order/guest-checkout`,
                {
                    email: values.email,
                    address: values.address,
                    name: values.name,
                    quantity: 1,
                    token,
                    listingId: cardId,
                    isCardSave: true,
                },
                {
                    headers: customHeaders,
                }
            );
            this.setState({ checkoutCompleteProgress: false });

            if (request.data.success) {
                this.props.handleClose();
                notification.success({
                    message: 'Success!!',
                    description: request.data.message,
                    duration: 20,
                });
            } else {
                notification.error({
                    message: 'Failed',
                    description: request.data.message,
                    duration: 15,
                });
            }
        } catch (error) {
            notification.error({
                message: 'Failed',
                description: `${error}`,
                duration: 15,
            });
        } finally {
            this.setState({ checkoutCompleteProgress: false });
        }
    };

    render() {
        const { cardId, price } = this.props;

        return (
            <div
                className="ps-section--shopping"
                style={{
                    padding: '10px 0px',
                }}>
                <div>
                    <div
                        className="ps-section__header"
                        style={{
                            padding: '20px',
                        }}>
                        <h2>Payment</h2>
                        <p style={{ color: '#fff' }}>
                            You are purchasing as a guest
                        </p>
                        <p style={{ color: '#fff' }}>
                            Want to buy as a user?{' '}
                            <Link href={`/product/${cardId}`}>click here</Link>
                        </p>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 order-last order-lg-first">
                        <CheckoutForm
                            amount={price}
                            handleCheckout={this.handleCheckout}
                            cardId={cardId}
                            isCheckoutLoading={this.props.isCheckoutLoading}
                            checkoutCompleteProgress={
                                this.state.checkoutCompleteProgress
                            }
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Payment;

const StripeHoc = (WrappedComponent) => (props) => {
    const stripePromise = loadStripe(CONFIG.stripe_publishable_key);
    return (
        <Elements stripe={stripePromise}>
            <WrappedComponent {...props} />
        </Elements>
    );
};

const CheckoutForm = StripeHoc(
    ({
        handleCheckout,
        isCheckoutLoading,
        amount,
        cardId,
        checkoutCompleteProgress,
    }) => {
        const stripe = useStripe();
        const elements = useElements();

        const handleSubmit = async (values) => {
            // Block native form submission.

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
                handleCheckout(token.id, cardId, values);
            }
        };

        return (
            <>
                <Form onFinish={handleSubmit}>
                    <div className="form-group">
                        <Form.Item
                            name="name"
                            style={{
                                color: 'red',
                                backgroundColor: '#1890ff !important',
                            }}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your name!',
                                    type: 'string',
                                },
                            ]}>
                            <Input
                                className="form-control light"
                                placeholder="Enter your name!"
                                style={{
                                    backgroundColor: '#121634',
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            style={{ color: 'red' }}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                    type: 'email',
                                },
                            ]}>
                            <Input
                                className="form-control light input-bacgroud-remain-primary"
                                placeholder="Enter your email!"
                                style={{
                                    backgroundColor: '#121634',
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            name="address"
                            style={{ color: 'red' }}
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Please input your complete address!',
                                    type: 'string',
                                },
                            ]}>
                            <Input.TextArea
                                className="form-control light"
                                placeholder="Enter your complete address!"
                                autoSize={{ minRows: 3, maxRows: 5 }}
                                style={{
                                    backgroundColor: '#121634',
                                }}
                            />
                        </Form.Item>

                        <CardElement
                            options={{
                                hidePostalCode: true,
                                style: {
                                    base: {
                                        fontSize: '13px',
                                        border: '1px solid red',
                                        iconColor: '#121634',

                                        color: '#121634',
                                        '::placeholder': {
                                            color: '#121634',
                                        },
                                    },
                                },
                            }}
                        />
                    </div>

                    <div
                        style={{
                            textAlign: 'center',
                        }}>
                        {isCheckoutLoading ? (
                            <Row align="middle" justify="center">
                                <Spin size="large"></Spin>
                            </Row>
                        ) : !checkoutCompleteProgress ? (
                            <button
                                style={{
                                    width: '100%',
                                    fontSize: '1.9rem',
                                    marginTop: '9px',
                                }}
                                className="ps-btn ps-btn--fullwidth">
                                {`Pay $${amount}`}
                            </button>
                        ) : (
                            <LoadingOutlined style={{ color: '#fff' }} />
                        )}
                    </div>
                </Form>
            </>
        );
    }
);

// export default CheckoutForm
