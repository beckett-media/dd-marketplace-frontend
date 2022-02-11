import React, { useEffect, useState } from 'react';
import ProductAuction from '~/components/elements/products/ProductAuction';
import ProductAuctionWide from '~/components/elements/products/ProductAuctionWide';
import { useRouter } from 'next/router';
import { generateTempArray } from '~/utilities/common-helpers';
import SkeletonProduct from '~/components/elements/skeletons/SkeletonProduct';
import { CodeSandboxOutlined } from '@ant-design/icons';

const ShopAuctionItems = ({
    columns = 4,
    pageSize = 12,
    productItems = [],
    loading = false,
}) => {
    const Router = useRouter();
    const { page } = Router.query;
    const { query } = Router;
    const [listView, setListView] = useState(true);
    const [classes, setClasses] = useState(
        'col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6'
    );

    function handleSetColumns() {
        switch (columns) {
            case 2:
                setClasses('col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6');
                return 3;
            case 4:
                setClasses('col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6');
                return 4;
            case 6:
                setClasses('col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6');
                return 6;
            default:
                setClasses('col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6');
        }
    }

    useEffect(() => {
        let params;
        if (query) {
            if (query.page) {
                params = {
                    _start: page * pageSize,
                    _limit: pageSize,
                };
            } else {
                params = query;
                params._limit = pageSize;
            }
        } else {
            params = {
                _limit: pageSize,
            };
        }

        handleSetColumns();
    }, [query]);

    // Views
    let productItemsView;
    if (!loading) {
        if (productItems && productItems.length > 0) {
            if (listView) {
                const items = productItems.map((item) => (
                    <div className={classes} key={item.id}>
                        <ProductAuction auction={item} />
                    </div>
                ));
                productItemsView = (
                    <div className="ps-shop-items">
                        <div className="row">{items}</div>
                    </div>
                );
            } else {
                productItemsView = productItems.map((item) => (
                    <ProductAuctionWide product={item.listing} />
                ));
            }
        } else {
            productItemsView = (
                <div className="text-center p-5">
                    <CodeSandboxOutlined style={{ fontSize: 30 }} />
                    <p>No Products Found</p>
                </div>
            );
        }
    } else {
        const skeletonItems = generateTempArray(12).map((item) => (
            <div className={classes} key={item}>
                <SkeletonProduct />
            </div>
        ));
        productItemsView = <div className="row">{skeletonItems}</div>;
    }

    return (
        <div className="ps-shopping">
            <div className="ps-shopping__content">{productItemsView}</div>
        </div>
    );
};

export default ShopAuctionItems;
