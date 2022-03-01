import React, { useEffect, useState } from 'react';
import Router, { withRouter, useRouter } from 'next/router';
import BreadCrumb from '~/components/elements/BreadCrumb';
import Checkout from '~/components/partials/account/Checkout';
import { getCart } from '~/store/cart/action';
import { connect, useDispatch } from 'react-redux';
import ContainerPage from '~/components/layouts/ContainerPage';
import AuthHoc from '~/repositories/AuthHoc';
import AuctionProductRepository from '~/repositories/AuctionProductRepository';

const CheckoutAuctionPage = () => {
    const router = useRouter();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        console.log(router.query);
        const { id_ } = router.query;
        getAuctionProduct(id_);
    }, []);
    async function getAuctionProduct(pid) {
        // setLoading(true);
        const responseData = await AuctionProductRepository.getAuctionProductsById(
            pid
        );
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
        },
    ];
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);

    return (
        <ContainerPage title="Checkout" boxed={true}>
            <div className="ps-page--simple">
                <BreadCrumb breacrumb={breadCrumb} />
                <Checkout auctionProduct={product}/>
            </div>
        </ContainerPage>
    );
};

export default withRouter(connect()(AuthHoc(CheckoutAuctionPage)));
