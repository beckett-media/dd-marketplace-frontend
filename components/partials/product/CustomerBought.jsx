import React, { useEffect } from 'react';
import { getProductsByCollectionHelper } from '~/utilities/strapi-fetch-data-helpers';

const CustomerBought = ({ collectionSlug, boxed }) => {
    async function getProducts() {
        const responseData = await getProductsByCollectionHelper(
            collectionSlug
        );
        if (responseData) {
            setTimeout(function () {}.bind(this), 250);
        }
    }

    useEffect(() => {
        getProducts();
    }, [collectionSlug]);

    return (
        <div
            className={`ps-section--default ps-customer-bought ${
                boxed === true ? 'boxed' : ''
            }`}>
            <div className="ps-section__header">
                <h3>Customers who bought this item also bought</h3>
            </div>
        </div>
    );
};

export default CustomerBought;
