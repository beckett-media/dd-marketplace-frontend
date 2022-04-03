import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ProductHorizontal from '~/components/elements/products/ProductHorizontal';
import Title from '~/components/elements/Title';
import StoreDefault from '~/components/elements/stores/StoreDefault';
import ProductAuction from '~/components/elements/products/ProductAuction';

const titles = {
    recommendation: 'Recommended',
    newAuctions: 'New Auctions',
    trendingCards: 'Trending Cards',
    trendingPlayers: 'Trending Players',
    newArrival: 'New Arrivals',
    newStores: 'New Stores',
};

const titlesUrls = {
    recommendation: '/shop',
    newAuctions: '/auctions',
    trendingCards: '/shop',
    trendingPlayers: '/shop',
    newArrival: '/shop',
    newStores: '/stores',
};

const getComponentToRender = (id, item) => {
    switch (id) {
        case 'newStores':
            return <StoreDefault source={item} />;
        case 'newAuctions':
            return <ProductAuction auction={item} />;
        default:
            return <ProductHorizontal product={item} />;
    }
};

const NewArrivals = ({ collectionSlug, id, list, loading }) => {
    let productItemView;
    if (!loading) {
        if (list && list.length > 0) {
            productItemView = list.map((item) => (
                <div
                    className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12"
                    key={item.id}>
                    {getComponentToRender(id, item)}
                </div>
            ));
        } else {
            productItemView = <p>No product found.</p>;
        }
    } else {
        productItemView = <p>Loading...</p>;
    }
    return (
        <div className="ps-product-list ps-new-arrivals">
            <div className="ps-container">
                <div className="ps-section__header">
                    {/* <Title title={titles[id]} />
                     */}
                    <h3 style={{ color: '#FFFFFF' }}>{titles[id]}</h3>
                    <ul className="ps-section__links">
                        <li style={{ color: '#FFFFFF' }}>
                            <Link href={titlesUrls[id]}>
                                <a>View All</a>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="ps-section__content">
                    <div className="row">{productItemView}</div>
                </div>
            </div>
        </div>
    );
};

export default NewArrivals;

/* <ul className="ps-section__links">
                        <li>
                            <Link href="/shop">
                                <a>Technologies</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/shop">
                                <a>Electronic</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/shop">
                                <a>Furnitures</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/shop">
                                <a>Clothing & Apparel</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/shop?category=health-and-beauty">
                                <a>Health & Beauty</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/shop">
                                <a>View All</a>
                            </Link>
                        </li>
                    </ul> */
