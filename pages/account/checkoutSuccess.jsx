import React from 'react';
import { Result, Button, Row } from 'antd';
import ContainerPage from '~/components/layouts/ContainerPage';

const CheckoutSuccess = () => {
    return (
        <ContainerPage boxed={true} title="Address">
            <Row align="middle" justify="center" style={{}}>
                <Result
                    status="success"
                    title="Thank you"
                    subTitle="Your order has been confirmed"
                    extra={[
                        <a
                            className="ps-btn "
                            href="/account/orders"
                            type="primary"
                            key="console">
                            View Orders
                        </a>,
                        <a
                            className="ps-btn ps-btn--outline"
                            href="/shop"
                            key="buy">
                            Continue Shopping
                        </a>,
                    ]}
                />
            </Row>
        </ContainerPage>
    );
};

export default CheckoutSuccess;
