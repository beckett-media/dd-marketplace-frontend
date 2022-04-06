import React from 'react';
import Head from 'next/head';
import { Modal, Button, Row, Col, Typography, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { getUserStripeId } from '~/store/auth/selectors';
import { useSelector } from 'react-redux';
const { default: stripe } = require('~/constants/stripe');
const { Text } = Typography;

const StripeConnect = (props) => {
    const { visible, onOk, onCancel } = props;
    const onATagClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const path = `${window.location.pathname}${window.location.search}`;

        localStorage.setItem('stripe-connect-redirect', path);
        window.location.href = `https://connect.stripe.com/express/oauth/authorize?redirect_uri=${stripe.redirectURl}&client_id=${stripe.stripePk}&state=${stripe.stripeState}`;
    };
    return (
        <Modal
            title="Stripe Account Verification"
            visible={visible}
            onOk={() => onOk(false)}
            onCancel={() => onCancel(false)}
            footer={[
                <Button
                    key="back"
                    type="outline"
                    onClick={() => onCancel(false)}
                    style={{ marginRight: 15 }}>
                    Cancel
                </Button>,
                <Button key="back" type="primary" onClick={onATagClick}>
                    Link Now
                </Button>,
            ]}>
            <>
                <Head>
                    <script src="https://js.stripe.com/v3/"></script>
                </Head>

                <>
                    <Row className="stripediv" justify="center" align="middle">
                        <Col style={{ textAlign: 'center' }}>
                            <Row
                                justify="center"
                                align="middle"
                                gutter={[8, 8]}>
                                <Col>
                                    <Spin size="large" />
                                </Col>
                            </Row>

                            {/* <Text strong>In Order to complete the signup proccess</Text> */}
                            <Text strong>
                                This Stripe account will be along with you in
                                the whole process of placing bid and winnig your
                                favorites
                            </Text>
                        </Col>
                    </Row>
                </>
            </>
        </Modal>
    );
};

export default StripeConnect;

export const StripeConnectWrapper = ({ checkRef }) => {
    const [isStripeModalVisible, setisStripeModalVisible] = useState(false);
    const stripeId = useSelector(getUserStripeId);

    useEffect(() => {
        checkRef.current = check;
        check();
    }, [stripeId]);

    const check = (callback) => {
        if (!stripeId) return toggleModalValue();
        if (callback) callback();
    };

    const toggleModalValue = () => {
        setisStripeModalVisible((prev) => !prev);
    };

    return isStripeModalVisible ? (
        <StripeConnect
            visible={isStripeModalVisible}
            onOk={toggleModalValue}
            onCancel={toggleModalValue}
        />
    ) : (
        <></>
    );
};
