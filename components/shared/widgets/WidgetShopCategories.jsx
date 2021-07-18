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

    async function getCategories() {
        setLoading(true);
        const responseData = await ProductRepository.getProductCategories();
        if (responseData) {
            setCategories(responseData);
            setTimeout(
                function () {
                    setLoading(false);
                }.bind(this),
                250
            );
        }
    }

    useEffect(() => {}, []);

    const { products = [] } = useSelector(getMarketPlaceData);

    // Views
    let categoriesView;
    if (!loading) {
        if (products && products.length > 0) {
            const items = products.map((item) => (
                <li
                    key={item._id}
                    className={item._id === slug ? 'active' : ''}
                    onClick={() => dispatch(getListingsByProducts(item._id))}>
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
            <h4 className="widget-title">By Product</h4>
            {categoriesView}
        </aside>
    );
};

export default WidgetShopCategories;
