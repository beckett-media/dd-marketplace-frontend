import React, { useEffect, useState } from 'react';
import { getProductsByCollectionHelper } from '~/utilities/strapi-fetch-data-helpers';

const CustomerBought = ({ collectionSlug, boxed }) => {
    const [loading, setLoading] = useState(true);

    async function getProducts() {
        setLoading(true);
        const responseData = await getProductsByCollectionHelper(
            collectionSlug
        );
        if (responseData) {
            setTimeout(
                function () {
                    setLoading(false);
                }.bind(this),
                250
            );
        }
    }

    useEffect(() => {
        getProducts();
    }, [collectionSlug]);

    // Views
    let carouselView;
    if (!loading) {
        carouselView = <p>No product found.</p>;
    } else {
        carouselView = <p>Loading...</p>;
    }

    return (
        <div
            className={`ps-section--default ps-customer-bought ${
                boxed === true ? 'boxed' : ''
            }`}>
            <div className="ps-section__header">
                <h3>Customers who bought this item also bought</h3>
            </div>
            <div className="ps-section__content">{carouselView}</div>
        </div>
    );
};

export default CustomerBought;
