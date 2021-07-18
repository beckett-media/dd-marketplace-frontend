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
        label: i.name,
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
