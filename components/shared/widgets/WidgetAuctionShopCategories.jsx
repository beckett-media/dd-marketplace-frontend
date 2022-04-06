import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuctionListingsByProducts } from '~/store/auction/action';
import { getMarketPlaceData } from '~/store/home/selector';

const WidgetAuctionShopCategories = () => {
    const Router = useRouter();

    const dispatch = useDispatch();
    const loading = false;

    const { slug } = Router.query;

    const { products = [] } = useSelector(getMarketPlaceData);

    useEffect(() => {
        console.log(products);
        if (products.length) {
            console.log('products: ', products);
            Router.replace('/auctions', '/auctions?productId=all', {
                shallow: true,
            });
            dispatch(getAuctionListingsByProducts('all'));
        }
    }, [products.length]);

    const onProductClick = (item) => {
        Router.replace('/auctions', '/auctions?productId=' + item._id, {
            shallow: true,
        });
    };

    let productId = null;
    if (products && products.length) {
        const urlSearchParams = new URLSearchParams(window.location.search);
        productId = urlSearchParams.get('productId');
    }

    let categoriesView;
    if (!loading) {
        if (products && products.length > 0) {
            const items = products.map((item) => (
                <li
                    style={{
                        ...(productId === item._id
                            ? {
                                  color: '#37c4ce',
                              }
                            : {}),

                        cursor: 'pointer',
                    }}
                    key={item._id}
                    className={item._id === slug ? 'active' : ''}
                    onClick={() => onProductClick(item)}>
                    {item.name}
                </li>
            ));
            categoriesView = <ul className="ps-list--categories">{items}</ul>;
        }
    } else {
        categoriesView = <p>Loading...</p>;
    }

    return (
        <aside className="widget widget_shop">
            <p className="widget-title">By Product</p>
            {categoriesView}
        </aside>
    );
};

export default WidgetAuctionShopCategories;
