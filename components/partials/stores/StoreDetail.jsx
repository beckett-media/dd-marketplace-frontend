import React, { useEffect, useState } from 'react';
import ModuleStoreInformation from '~/components/partials/stores/modules/ModuleStoreInformation';
import ModuleStoreItems from '~/components/partials/stores/modules/ModuleStoreItems';
import StoreRepository from '~/repositories/StoreRepository';
import { useRouter } from 'next/router';

const StoreDetail = ({slug}) => {
    const [store, setStore] = useState(null);
    const [loading, setLoading] = useState(false);

    async function getStore(params) {
        setLoading(true);
        const responseData = await StoreRepository.getStoreBySlug(params);
        if (responseData) {
            setStore(responseData);
            setTimeout(
                function () {
                    setLoading(false);
                }.bind(this),
                250
            );
        }
    }

    useEffect(() => {
        if(slug) getStore(slug);
    }, [slug]);
    //Views
    let storeProductsView;
    if (!loading) {
        if (store && store.listing.length > 0) {
            storeProductsView = (
                <div className="ps-store-products">
                    <ModuleStoreItems products={store.listing} />
                </div>
            );
        } else {
            storeProductsView = <p>No product found.</p>;
        }
    } else {
        storeProductsView = <p>Loading...</p>;
    }
    return (
        <div className="ps-vendor-store">
            <div className="container">
                <div className="ps-section__container">
                    <div className="ps-section__left">
                        {store !== null && (
                            <ModuleStoreInformation
                                store={store && store !== null ? store : null}
                            />
                        )}
                    </div>
                    <div className="ps-section__right">
                        {storeProductsView}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoreDetail;
