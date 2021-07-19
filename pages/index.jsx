import React, { useEffect } from 'react';
// import SiteFeatures from '~/components/partials/homepage/home-default/SiteFeatures';
// import HomeAdsColumns from '~/components/partials/homepage/home-default/HomeAdsColumns';
// import HomeAds from '~/components/partials/homepage/home-default/HomeAds';
// import DownLoadApp from '~/components/partials/commons/DownLoadApp';
import NewArrivals from '~/components/partials/homepage/home-default/NewArrivals';
import Newletters from '~/components/partials/commons/Newletters';
// import HomeDefaultDealOfDay from '~/components/partials/homepage/home-default/HomeDefaultDealOfDay';
// import HomeDefaultTopCategories from '~/components/partials/homepage/home-default/HomeDefaultTopCategories';
import ContainerHomeDefault from '~/components/layouts/ContainerHomeDefault';
// import HomeDefaultProductListing from '~/components/partials/homepage/home-default/HomeDefaultProductListing';
import HomeDefaultBanner from '~/components/partials/homepage/home-default/HomeDefaultBanner';
import { getMarketPlaceDetails } from '~/store/home/action';
import { useDispatch, useSelector } from 'react-redux';
import {
    getMarketPlaceData,
    getMarketPlaceLoading,
} from '~/store/home/selector';

import AuthHoc from '~/repositories/AuthHoc';

const HomepageDefaultPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMarketPlaceDetails());
    }, []);

    const {
        recommendation,
        trendingCards,
        trendingPlayers,
        newArrival,
    } = useSelector(getMarketPlaceData);

    const isMarketPlaceLoading = useSelector(getMarketPlaceLoading);

    const marketplace = {
        recommendation,
        trendingCards,
        trendingPlayers,
        newArrival,
    };

    return (
        <ContainerHomeDefault title="Multipurpose Marketplace React Ecommerce Template">
            <HomeDefaultBanner />
            {/* <SiteFeatures /> */}
            {/* <HomeDefaultDealOfDay collectionSlug="deal-of-the-day" /> */}
            {/* <HomeAdsColumns /> */}
            {/* <HomeDefaultTopCategories /> */}
            {/* <HomeDefaultProductListing
                collectionSlug="consumer-electronics"
                title="Consumer Electronics"
            /> */}
            {/* <HomeDefaultProductListing
                collectionSlug="clothings"
                title="Clothings"
            /> */}
            {/* <HomeDefaultProductListing
                collectionSlug="garden-and-kitchen"
                title="Garden & Kitchen"
            /> */}
            {/* <HomeAds /> */}
            {/* <DownLoadApp /> */}

            {Object.keys(marketplace).map((key) => {
                const list = marketplace[key];
                if (list && list.length)
                    return (
                        <NewArrivals
                            loading={isMarketPlaceLoading}
                            key={key}
                            id={key}
                            list={list}
                            collectionSlug="new-arrivals-products"
                        />
                    );
            })}

            <Newletters />
        </ContainerHomeDefault>
    );
};

export default AuthHoc(HomepageDefaultPage);
