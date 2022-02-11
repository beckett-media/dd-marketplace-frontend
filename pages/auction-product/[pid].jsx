import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ContainerProductDetail from '~/components/layouts/ContainerProductDetail';
import AuctionProductRepository from '~/repositories/AuctionProductRepository';
import SkeletonProductDetail from '~/components/elements/skeletons/SkeletonProductDetail';
import BreadCrumb from '~/components/elements/BreadCrumb';
import ProductDetailFullwidth from '~/components/elements/detail/ProductDetailFullwidth';
import HeaderProduct from '~/components/shared/headers/HeaderProduct';
import HeaderDefault from '~/components/shared/headers/HeaderDefault';
import { useDispatch } from 'react-redux';
import { getMarketPlaceDetails } from '~/store/home/action';

const AuctionProductDefaultPage = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { pid } = router.query;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);

    async function getProduct(pid) {
        setLoading(true);
        const responseData = await AuctionProductRepository.getAuctionProductsById(
            pid
        );
        const payload = responseData?.data?.auction;

        if (payload) {
            setProduct({
                ...payload.listing,
                seller: payload.seller,
                auctionDetails: { ...payload, listing: null },
            });
            setTimeout(
                function () {
                    setLoading(false);
                }.bind(this),
                250
            );
        }
    }

    useEffect(() => {
        dispatch(getMarketPlaceDetails());
    }, []);

    useEffect(() => {
        getProduct(pid);
    }, [pid]);

    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Live Auctions',
            url: '/auctions',
        },
        {
            text: product ? product.title : 'Loading...',
        },
    ];
    // Views
    let productView, headerView;
    if (!loading) {
        if (product) {
            productView = <ProductDetailFullwidth product={product} />;
            headerView = <HeaderProduct product={product} />;
        } else {
            headerView = <HeaderDefault />;
        }
    } else {
        productView = <SkeletonProductDetail />;
    }
    return (
        <ContainerProductDetail title={product ? product.title : 'Loading...'}>
            {headerView}
            <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
            <div className="ps-page--product">
                <div className="ps-container">
                    <div className="ps-page__container">
                        <div className="ps-page__left">{productView}</div>
                        {/* <div className="ps-page__right">
                            <ProductWidgets />
                        </div> */}
                    </div>
                    {/* 
                    <CustomerBought
                        layout="fullwidth"
                        collectionSlug="deal-of-the-day"
                    /> */}
                    {/* <RelatedProduct collectionSlug="shop-recommend-items" /> */}
                </div>
            </div>
        </ContainerProductDetail>
    );
};

export default AuctionProductDefaultPage;
