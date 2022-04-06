import { useRouter, withRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import ContainerPage from '~/components/layouts/ContainerPage';
import Payment from '~/components/partials/account/Payment';
import AuctionProductRepository from '~/repositories/AuctionProductRepository';
import AuthHoc from '~/repositories/AuthHoc';
import { getSavedAddressRequest } from '~/store/checkout/action';

const PaymentPage = () => {
    const router = useRouter();
    const [product, setProduct] = useState(null);
    useEffect(() => {
        const { id_ } = router.query;
        getAuctionProduct(id_);
    }, []);
    async function getAuctionProduct(pid) {
        const responseData =
            await AuctionProductRepository.getAuctionProductsById(pid);
        const payload = responseData?.data?.auction;

        if (payload) {
            setProduct(payload);
        }
    }

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getSavedAddressRequest());
    }, [dispatch]);
    return (
        <ContainerPage title="Payment" boxed={true}>
            <div className="ps-page--simple">
                <Payment auctionProduct={product} />
            </div>
        </ContainerPage>
    );
};

export default withRouter(connect()(AuthHoc(PaymentPage)));
