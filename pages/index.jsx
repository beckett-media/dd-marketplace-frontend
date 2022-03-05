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
import { getUserDetails } from '~/store/userInfo/action';

const HomepageDefaultPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMarketPlaceDetails());
        dispatch(getUserDetails());
        dispatch(getMarketPlaceDetails());
    }, []);

    const {
        recommendation,
        newAuctions,
        trendingCards,
        trendingPlayers,
        newArrival,
        newStores,
    } = useSelector(getMarketPlaceData);

    const isMarketPlaceLoading = useSelector(getMarketPlaceLoading);

    const marketplace = {
        recommendation,
        newAuctions,
        trendingCards,
        trendingPlayers,
        newArrival,
        newStores,
    };

    return (
        <ContainerHomeDefault title="Revolutionizing how the world buys and sells sports cards">
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

            {/* <Newletters /> */}
        </ContainerHomeDefault>
    );
};

export default HomepageDefaultPage;
