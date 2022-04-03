import React from 'react';
import ContainerShop from '~/components/layouts/ContainerShop';
import BreadCrumb from '~/components/elements/BreadCrumb';
import ShopItems from '~/components/partials/shop/ShopItems';
import ProductGroupByCarousel from '~/components/partials/product/ProductGroupByCarousel';
import ShopCategories from '~/components/partials/shop/ShopCategories';
import ShopBrands from '~/components/partials/shop/ShopBrands';
import ShopBanner from '~/components/partials/shop/ShopBanner';
import WidgetShopCategories from '~/components/shared/widgets/WidgetShopCategories';
import WidgetShopGrade, {
    WidgetShopGradesNew,
} from '~/components/shared/widgets/WidgetShopGrade';
import WidgetShopFilterByPriceRange from '~/components/shared/widgets/WidgetShopFilterByPriceRange';
import { useDispatch, useSelector } from 'react-redux';
import { getListings, getListingsLoading } from '~/store/product/selectors';
import { Row, Select } from 'antd';
import { getMarketPlaceData } from '~/store/home/selector';
import {
    getListingsByGrade,
    getListingsByProducts,
} from '~/store/product/action';
import Router from 'next/router';
import Title from '~/components/elements/Title';
import WidgetUserWelcome from '~/components/partials/account/WidgetUserWelcome';

const ShopDefaultPage = () => {
    const productItems = useSelector(getListings);
    const loading = useSelector(getListingsLoading);

    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Shop',
        },
    ];

    return (
        <ContainerShop title="Shop">
            <div className="ps-page--shop">
                <div style={{ position: 'absolute', right: 10, top: 10 }}>
                    <img
                        style={{ width: 100 }}
                        src="/static/img/dotted-bg.png"
                    />
                </div>

                <div className="ps-container">
                    <ShopBanner />

                    <div className="ps-layout--shop">
                        <div className="ps-layout__left">
                            <WidgetUserWelcome />
                            <WidgetShopCategories />
                            <WidgetShopGradesNew />
                            {/* <WidgetShopFilterByPriceRange /> */}
                        </div>

                        <div className="ps-layout__right">
                            {/* <Title
                                title="Marketplace"
                                subtitle="Due Dilly Marketplace"
                            /> */}
                            <h2>MARKETPLACE</h2>
                            <p>Due Dilly Marketplace</p>

                            <MobileFilter />

                            <ShopItems
                                productItems={productItems}
                                loading={loading}
                                columns={6}
                                pageSize={18}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </ContainerShop>
    );
};
export default ShopDefaultPage;

const MobileFilter = () => {
    const dispatch = useDispatch();
    const { products = [], grades = [] } = useSelector(getMarketPlaceData);

    const onChange = (id) => {
        if (grades.includes(id)) {
            dispatch(getListingsByGrade(id));
            Router.replace('/shop', '/shop?gradeId=' + id, {
                shallow: true,
            });
        } else {
            Router.replace('/shop', '/shop?productId=' + id, { shallow: true });
            dispatch(getListingsByProducts(id));
        }
    };

    return (
        <div className="ps-layout__left_mobile" style={{ marginTop: 10 }}>
            <Row align="stretch">
                <Selector
                    onChange={onChange}
                    options={[...products, ...grades]}
                />
            </Row>
        </div>
    );
};

const { Option } = Select;

const Selector = (props) => {
    const { options = [], value, onChange } = props;

    return (
        <Select
            style={{ width: '100%' }}
            value={value}
            placeholder="Select a Type"
            allowClear
            onChange={onChange}>
            <Option disabled value="">
                Choose
            </Option>
            {options && options.length
                ? options.map(({ _id, name }) => (
                      <Option key={_id} value={_id}>
                          {name}
                      </Option>
                  ))
                : null}
        </Select>
    );
};
