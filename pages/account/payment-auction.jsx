import React, { useEffect, useState } from 'react';
import { withRouter, useRouter } from 'next/router';

import BreadCrumb from '~/components/elements/BreadCrumb';
import Payment from '~/components/partials/account/Payment';
import { useDispatch, connect } from 'react-redux';
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
        const payload = responseData?.data?.auction;

        if (payload) {
            setProduct(payload);
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
            url: `/account/checkout-auction?id_=${router.query?.id_}`,
        },
        {
            text: 'Auction Payment',
        },
    ];
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getSavedAddressRequest());
    }, [dispatch]);
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
