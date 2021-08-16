import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getProductsByCollectionHelper } from '~/utilities/strapi-fetch-data-helpers';
import ProductHorizontal from '~/components/elements/products/ProductHorizontal';
import Title from '~/components/elements/Title';

const titles = {
    recommendation: 'Recommended',
    trendingCards: 'Trending Cards',
    trendingPlayers: 'Trending Players',
    newArrival: 'New Arrivals',
};

const NewArrivals = ({ collectionSlug, id, list, loading }) => {
    let productItemView;
    if (!loading) {
        if (list && list.length > 0) {
            productItemView = list.map((item) => (
                <div
                    className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12"
                    key={item.id}>
                    <ProductHorizontal product={item} />
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
                    <Title title={titles[id]} />
                    <ul className="ps-section__links">
                        <li>
                            <Link href="/shop">
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
