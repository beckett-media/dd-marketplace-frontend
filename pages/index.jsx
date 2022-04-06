import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContainerHomeDefault from '~/components/layouts/ContainerHomeDefault';
import HomeDefaultBanner from '~/components/partials/homepage/home-default/HomeDefaultBanner';

import NewArrivals from '~/components/partials/homepage/home-default/NewArrivals';
import { getMarketPlaceDetails } from '~/store/home/action';
import {
    getMarketPlaceData,
    getMarketPlaceLoading,
} from '~/store/home/selector';
import { getUserDetails } from '~/store/userInfo/action';

const HomepageDefaultPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
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
        </ContainerHomeDefault>
    );
};

export default HomepageDefaultPage;
