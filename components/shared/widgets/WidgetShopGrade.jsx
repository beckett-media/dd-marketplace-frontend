import React, { useEffect, useState } from 'react';
import ProductRepository from '~/repositories/ProductRepository';
import Link from 'next/link';
import { Checkbox } from 'antd';
import { Radio, Input } from 'antd';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { getMarketPlaceData } from '~/store/home/selector';
import { getListingsByGrade } from '~/store/product/action';

const WidgetShopBrands = () => {
    const Router = useRouter();
    const dispatch = useDispatch();
    const { slug } = Router.query;

    const [loading, setLoading] = useState(false);

    const { grades = [] } = useSelector(getMarketPlaceData);

    function handleSelectBrand(e) {
        const value = e.target.value;

        Router.replace('/shop', '/shop?gradeId=' + value, {
            shallow: true,
        });
        dispatch(getListingsByGrade(value));
    }

    // Views
    let brandsView;
    if (!loading) {
        if (grades && grades.length > 0) {
            const items = grades.map((item) => (
                <li key={item._id}>
                    <Link href={`shop/${item._id}`}>{item.name}</Link>
                </li>
            ));
            brandsView = <ul className="ps-list--brands">{items}</ul>;
        } else {
        }
    } else {
        brandsView = <p>Loading...</p>;
    }

    const formatedBrands = grades.map((i) => ({
        id: i._id,
        value: i._id,
        label: i._id,
    }));

    return (
        <aside className="widget widget_shop widget_shop--brand">
            <h4 className="widget-title">By Grades</h4>
            <figure>
                <Radio.Group
                    defaultValue={slug}
                    options={formatedBrands}
                    onChange={handleSelectBrand}
                />
            </figure>
        </aside>
    );
};

export default WidgetShopBrands;

export const WidgetShopGradesNew = () => {
    const Router = useRouter();

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const { slug } = Router.query;

    const { grades = [] } = useSelector(getMarketPlaceData);

    useEffect(() => {
        if (grades.length) {
            const id = grades[0]._id;
            Router.replace('/shop', '/shop?gradeId=' + id, { shallow: true });
            dispatch(getListingsByGrade(id));
        }
    }, [grades.length]);

    const onProductClick = (item) => {
        Router.replace('/shop', '/shop?gradeId=' + item._id, {
            shallow: true,
        });
        dispatch(getListingsByGrade(item._id));
    };

    let productId = null;
    if (Boolean(grades && grades.length)) {
        const urlSearchParams = new URLSearchParams(window.location.search);
        productId = urlSearchParams.get('gradeId');
    }

    let categoriesView;
    if (!loading) {
        if (grades && grades.length > 0) {
            const items = grades.map((item) => (
                <li
                    style={{
                        ...(productId === item._id
                            ? {
                                  backgroundColor: '#37c4ce',
                                  color: '#000',
                                  padding: 10,
                              }
                            : {}),

                        cursor: 'pointer',
                    }}
                    key={item._id}
                    className={item._id === slug ? 'active' : ''}
                    onClick={() => onProductClick(item)}>
                    {item._id}&nbsp;({item.name})
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
            <h4 className="widget-title">By Grades</h4>
            {categoriesView}
        </aside>
    );
};
