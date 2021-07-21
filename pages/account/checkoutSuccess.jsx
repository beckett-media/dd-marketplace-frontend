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
        </ContainerPage>
    );
};

export default CheckoutSuccess;
