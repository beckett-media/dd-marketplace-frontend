import { Typography, Divider } from 'antd';
import { Row, Col, Spin } from 'antd';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { verifyStripeToken } from '~/store/userInfo/action';
const { Text } = Typography;

const StripeComplete = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const query = router.query;
    const code = query?.code || null;
    useEffect(() => {
        if (code) {
            const redirectPath = localStorage.getItem(
                'stripe-connect-redirect'
            );
            dispatch(verifyStripeToken(code, redirectPath));
            localStorage.removeItem('stripe-connect-redirect');
        }
    }, [code]);

    return (
        <>
            <Row justify="center" align="middle" style={{ height: '100vh' }}>
                <Col style={{ textAlign: 'center' }}>
                    <Text strong>Stripe verification is complete.</Text>
                    <Divider />
                    <Text style={{ textAlign: 'center' }} strong>
                        Please wait while we redirect you to login.
                    </Text>
                    <Divider />
                    <Spin size="large"></Spin>
                </Col>
            </Row>
        </>
    );
};

export default StripeComplete;
