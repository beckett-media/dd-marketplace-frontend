import React, { useEffect, useState } from 'react';
import Router, { withRouter, useRouter } from 'next/router';

import BreadCrumb from '~/components/elements/BreadCrumb';
import Payment from '~/components/partials/account/Payment';
import { useDispatch, connect } from 'react-redux';
import { getCart } from '~/store/cart/action';
import ContainerPage from '~/components/layouts/ContainerPage';
import AuthHoc from '~/repositories/AuthHoc';
import { getSavedAddressRequest } from '~/store/checkout/action';
import AuctionProductRepository from '~/repositories/AuctionProductRepository';

const PaymentPage = () => {
    const router = useRouter();
    const [product, setProduct] = useState(null);
    useEffect(() => {
        const { id_ } = router.query;
        getAuctionProduct(id_);
    }, []);
    async function getAuctionProduct(pid) {
        const responseData = await AuctionProductRepository.getAuctionProductsById(
            pid
        );
        console.log(responseData);
        const payload = responseData?.data?.auction;

        if (payload) {
            setProduct(payload.listing);
        }
    }
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'My Bids',
            url: '/account/my-bids',
        },
        {
            text: 'Auction Summary',
            url: '/checkout-auction',
        },
        {
            text: 'Auction Payment',
        },
    ];
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCart());
        dispatch(getSavedAddressRequest());
    }, [dispatch]);
    console.log(product, 'in payment');
    return (
        <ContainerPage title="Payment" boxed={true}>
            <div className="ps-page--simple">
                <BreadCrumb breacrumb={breadCrumb} />
                <Payment auctionProduct={product} />
            </div>
        </ContainerPage>
    );
};

export default withRouter(connect()(AuthHoc(PaymentPage)));
