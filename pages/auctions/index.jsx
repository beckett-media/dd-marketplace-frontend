import React from 'react';
import ContainerShop from '~/components/layouts/ContainerShop';
import BreadCrumb from '~/components/elements/BreadCrumb';
import ShopAuctionItems from '~/components/partials/shop/ShopAuctionItems';
import { useSelector, useDispatch } from 'react-redux';
import {
    getAuctionListings,
    getListingsLoading,
} from '~/store/auction/selectors';
import { getAuctionListingsByProducts } from '~/store/auction/action';
import Title from '~/components/elements/Title';
import { useEffect } from 'react';
import AuctionHeroBanner from '~/components/elements/AuctionHeroBanner';

const AuctionDefaultPage = () => {
    const productItems = useSelector(getAuctionListings);
    const loading = useSelector(getListingsLoading);
    const dispatch = useDispatch();
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Auctions',
        },
    ];

    useEffect(() => {
        dispatch(getAuctionListingsByProducts());
    }, []);

    return (
        <ContainerShop title="Shop">
            <BreadCrumb breacrumb={breadCrumb} />

            <div className="ps-page--shop">
                <div style={{ position: 'absolute', right: 10, top: 10 }}>
                    <img
                        style={{ width: 100 }}
                        src="/static/img/dotted-bg.png"
                    />
                </div>

                <div className="ps-container">
                    <div className="ps-container">
                        <div className="">
                            <Title
                                title="Auctions"
                                subtitle="Due Dilly Marketplace Auctions"
                            />
                            <AuctionHeroBanner
                                productImage={
                                    productItems?.[0]?.listing.images?.[0]
                                }
                                _id={productItems?.[0]?._id}
                            />

                            <ShopAuctionItems
                                productItems={productItems}
                                loading={loading}
                                columns={6}
                                pageSize={18}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </ContainerShop>
    );
};
export default AuctionDefaultPage;
