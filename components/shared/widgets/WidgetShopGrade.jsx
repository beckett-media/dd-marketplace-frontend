import React, { useEffect, useState } from 'react';
import ProductRepository from '~/repositories/ProductRepository';
import Link from 'next/link';
import { Checkbox } from 'antd';
import { Radio, Input } from 'antd';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { getMarketPlaceData } from '~/store/home/selector';

const WidgetShopBrands = () => {
    const Router = useRouter();
    const { slug } = Router.query;
    const [brands, setBrands] = useState(null);
    const [loading, setLoading] = useState(false);

    const { grades = [] } = useSelector(getMarketPlaceData);

    async function getCategories() {
        setLoading(true);
        const responseData = await ProductRepository.getBrands();
        if (responseData) {
            let brandsGroup = [];
            if (responseData.length > 0) {
                responseData.forEach((brand) => {
                    brandsGroup.push({
                        id: brand.id,
                        value: brand.slug,
                        label: brand.name,
                    });
                });
            }
            setBrands(brandsGroup);

            setTimeout(
                function () {
                    setLoading(false);
                }.bind(this),
                250
            );
        }
    }

    function handleSelectBrand(e) {
        Router.push(`/brand/${e.target.value}`);
    }

    useEffect(() => {}, []);

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
