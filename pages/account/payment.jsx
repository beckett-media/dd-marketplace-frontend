import React, { useEffect } from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';
import Payment from '~/components/partials/account/Payment';
import { useDispatch, connect } from 'react-redux';
import { getCart } from '~/store/cart/action';
import ContainerPage from '~/components/layouts/ContainerPage';
import AuthHoc from '~/repositories/AuthHoc';
import { getSavedAddressRequest } from '~/store/checkout/action';

const PaymentPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Shopping Cart',
            url: '/account/shopping-cart',
        },
        {
            text: 'Summary',
            url: '/account/checkout',
        },
        {
            text: 'Payment',
        },
    ];
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCart());
        dispatch(getSavedAddressRequest());
    }, [dispatch]);

    return (
        <ContainerPage title="Payment" boxed={true}>
            <div className="ps-page--simple">
                <BreadCrumb breacrumb={breadCrumb} />
                <Payment />
            </div>
        </ContainerPage>
    );
};

export default connect()(AuthHoc(PaymentPage));
