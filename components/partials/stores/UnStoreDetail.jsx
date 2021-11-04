import React, { useEffect, useState } from 'react';
import ModuleStoreInformation from '~/components/partials/stores/modules/ModuleStoreInformation';
import UnModuleStoreItems from '~/components/partials/stores/modules/UnModuleStoreItems';
import StoreRepositery from '~/repositories/StoreRepository';
import SkeletonProductDetail from '~/components/elements/skeletons/SkeletonProductDetail';
import { useRouter } from 'next/router';
import ModuleUnStoreDetailDescription from '~/components/elements/detail/modules/ModuleUnStoreDetailDescription';

const UnStoreDetail = () => {
    const router = useRouter();
    const [store, setUnclaimedStore] = useState(null);
    const [loading, setLoading] = useState(false);

    const products = [
        {
            playerNames: ['Vladimir Guerrero (Demo)'],
            tags: null,
            images: [
                'https://i.ebayimg.com/images/g/QMkAAOSw5gBhYUzw/s-l500.jpg',
            ],
            isPublic: true,
            status: 'sale',
            _id: '617ee29ffe2c7ec5e78ad929',
            user: '61667fa04cb150c96f49e5d1',
            store: '617eb62cece91ba2a5c1cedf',
            card: null,
            product: 'packCard',
            grade: 'Grade80',
            title: 'Topps Chrome Update Auto (Demo)',
            description: 'Topps Chrome Update Auto (Demo)',
            quantity: 21,
            availableQuantity: 21,
            price: 320,
            condition: 'Test Good Condition',
            serialNumber: '3e',
            cardType: 'Test Type',
            sport: 'Test Sport',
            cardNumber: '21',
            year: 1998,
            brand: 'Test Brand',
            modelNo: 'if working',
            createdAt: '2021-10-31T18:38:23.463Z',
            updatedAt: '2021-10-31T18:45:05.148Z',
            __v: 1,
            id: '617ee29ffe2c7ec5e78ad929',
        },
        {
            playerNames: ['Juan Soto Juan Jr. (Demo)'],
            tags: null,
            images: [
                'https://i.ebayimg.com/images/g/wX4AAOSwGlZgjRaZ/s-l500.jpg',
            ],
            isPublic: true,
            status: 'sale',
            _id: '617ee29ffe2c7ec5e78ad929',
            user: '61667fa04cb150c96f49e5d1',
            store: '617eb62cece91ba2a5c1cedf',
            card: null,
            product: 'packCard',
            grade: 'Grade90',
            title: 'Topps Update SSP #US300 (Demo)',
            description: 'Topps Update SSP #US300 (Demo)',
            quantity: 21,
            availableQuantity: 21,
            price: 349,
            condition: 'Test Good Condition',
            serialNumber: '3e',
            cardType: 'Test Type',
            sport: 'Test Sport',
            cardNumber: '21',
            year: 1998,
            brand: 'Test Brand',
            modelNo: 'if working',
            createdAt: '2021-10-31T18:38:23.463Z',
            updatedAt: '2021-10-31T18:45:05.148Z',
            __v: 1,
            id: '617ee29ffe2c7ec5e78ad929',
        },
        {
            playerNames: ['Matt Manning Call-Up (Demo)'],
            tags: null,
            images: [
                'https://i.ebayimg.com/images/g/-9oAAOSwZdJhGHNl/s-l500.jpg',
            ],
            isPublic: true,
            status: 'sale',
            _id: '617ee29ffe2c7ec5e78ad929',
            user: '61667fa04cb150c96f49e5d1',
            store: '617eb62cece91ba2a5c1cedf',
            card: null,
            product: 'packCard',
            grade: 'Grade100',
            title: 'Topps Update SSP #US300 (Demo)',
            description: 'Topps Update SSP #US300 (Demo)',
            quantity: 21,
            availableQuantity: 21,
            price: 179,
            condition: 'Test Good Condition',
            serialNumber: '3e',
            cardType: 'Test Type',
            sport: 'Test Sport',
            cardNumber: '21',
            year: 1998,
            brand: 'Test Brand',
            modelNo: 'if working',
            createdAt: '2021-10-31T18:38:23.463Z',
            updatedAt: '2021-10-31T18:45:05.148Z',
            __v: 1,
            id: '617ee29ffe2c7ec5e78ad929',
        },
    ];

    async function getStore(storeId) {
        setLoading(true);
        const responseData = await StoreRepositery.getSelectedClaimedStore(
            storeId
        );
        console.log(responseData);
        const payload = responseData?.data?.store;
        if (payload) {
            setUnclaimedStore(payload);
            setTimeout(
                function () {
                    setLoading(false);
                }.bind(this),
                250
            );
        } else {
            router.push('/404');
        }
    }

    useEffect(() => {
        if (router.query.claim) getStore(router.query.claim);
    }, [router.query.claim]);
    let storeProductsView;
    if (!loading) {
        if (store && products.length > 0) {
            storeProductsView = (
                <>
                    <div className="ps-store-products">
                        <UnModuleStoreItems products={products} />
                    </div>
                    <ModuleUnStoreDetailDescription storeId={store.id} />
                </>
            );
        } else {
            storeProductsView = <p>No product found.</p>;
        }
    } else {
        storeProductsView = <SkeletonProductDetail />;
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
                    <div className="ps-section__right">{storeProductsView}</div>
                </div>
            </div>
        </div>
    );
};

export default UnStoreDetail;
