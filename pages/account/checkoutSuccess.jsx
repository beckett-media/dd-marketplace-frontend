import React from 'react';
import { Result, Button, Row } from 'antd';

const CheckoutSuccess = () => {
    return (
        <Row align="middle" justify="center" style={{ height: '100vh' }}>
            <Result
                status="success"
                title="Thank you"
                subTitle="Your order has been confirmed"
                extra={[
                    <Button
                        href="/account/invoices"
                        type="primary"
                        key="console">
                        View Orders
                    </Button>,
                    <Button href="/shop" key="buy">
                        Continue Shopping
                    </Button>,
                ]}
            />
        </Row>
    );
};

export default CheckoutSuccess;
