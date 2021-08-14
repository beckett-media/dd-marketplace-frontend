import React, { useEffect, useState } from 'react';
import ProductRepository from '~/repositories/ProductRepository';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { getMarketPlaceData } from '~/store/home/selector';
import { getListingsByProducts } from '~/store/product/action';

const WidgetShopCategories = () => {
    const Router = useRouter();

    const dispatch = useDispatch();
    const [categories, setCategories] = useState(null);
    const [loading, setLoading] = useState(false);

    const { slug } = Router.query;

    const { products = [] } = useSelector(getMarketPlaceData);

    useEffect(() => {
        if (products.length) {
            console.log('products: ', products);
            const id = products[0]._id;
            Router.replace('/shop', '/shop?productId=' + id, { shallow: true });
            dispatch(getListingsByProducts(id));
        }
    }, [products.length]);

    const onProductClick = (item) => {
        Router.replace('/shop', '/shop?productId=' + item._id, {
            shallow: true,
        });
        dispatch(getListingsByProducts(item._id));
    };

    let productId = null;
    if (Boolean(products && products.length)) {
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
        } else {
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

export default WidgetShopCategories;
