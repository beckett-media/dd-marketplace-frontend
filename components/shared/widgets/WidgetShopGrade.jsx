import { Radio } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMarketPlaceData } from '~/store/home/selector';
import { getListingsByGrade } from '~/store/product/action';

const WidgetShopBrands = () => {
    const Router = useRouter();
    const dispatch = useDispatch();
    const { slug } = Router.query;

    const { grades = [] } = useSelector(getMarketPlaceData);

    function handleSelectBrand(e) {
        const value = e.target.value;

        Router.replace('/shop', '/shop?gradeId=' + value, {
            shallow: true,
        });
        dispatch(getListingsByGrade(value));
    }

    const formatedBrands = grades.map((i) => ({
        id: i._id,
        value: i._id,
        label: i._id,
    }));

    return (
        <aside className="widget widget_shop widget_shop--brand">
            <p className="widget-title">By Grades</p>
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

    const loading = false;

    const { slug } = Router.query;

    const { grades = [] } = useSelector(getMarketPlaceData);

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
                                  color: '#37c4ce',
                                  padding: 10,
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
            categoriesView = (
                <ul className="ps-list--categories grades">{items}</ul>
            );
        }
    } else {
        categoriesView = <p>Loading...</p>;
    }

    return (
        <aside className="widget widget_shop">
            <p className="widget-title">By Grades</p>
            {categoriesView}
        </aside>
    );
};
