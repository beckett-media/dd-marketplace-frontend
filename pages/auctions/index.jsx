import React from 'react';
import ContainerShop from '~/components/layouts/ContainerShop';
import BreadCrumb from '~/components/elements/BreadCrumb';
import ShopAuctionItems from '~/components/partials/shop/ShopAuctionItems';
import ShopBanner from '~/components/partials/shop/ShopBanner';
import WidgetAuctionShopCategories from '~/components/shared/widgets/WidgetAuctionShopCategories';
import { WidgetShopGradesNew } from '~/components/shared/widgets/WidgetShopGrade';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAuctionListings,
    getListingsLoading,
} from '~/store/auction/selectors';
import { Row, Select } from 'antd';
import { getMarketPlaceData } from '~/store/home/selector';
import {
    getListingsByGrade,
    getListingsByProducts,
} from '~/store/product/action';
import Router from 'next/router';
import Title from '~/components/elements/Title';
import WidgetUserWelcome from '~/components/partials/account/WidgetUserWelcome';

const AuctionDefaultPage = () => {
    const productItems = useSelector(getAuctionListings);
    const loading = useSelector(getListingsLoading);
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Auctions',
        },
    ];

    return (
        <ContainerShop title="Shop">
            <BreadCrumb breacrumb={breadCrumb} />

            <div className="ps-page--shop">
                <div style={{ position: 'absolute', right: 10, top: 10 }}>
                    <img
                        style={{ width: 100 }}
                        src="/static/img/dotted-bg.png"
                    />
                </div>

                <div className="ps-container">
                    <ShopBanner />

                    <div className="">
                        {/* <div className="ps-layout__left"> */}
                        {/* <WidgetUserWelcome /> */}
                        {/* <WidgetAuctionShopCategories /> */}
                        {/* <WidgetShopGradesNew /> */}
                        {/* </div> */}

                        <div className="">
                            <Title
                                title="Auctions"
                                subtitle="Due Dilly Marketplace Auctions"
                            />

                            {/* <MobileFilter /> */}

                            <ShopAuctionItems
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
export default AuctionDefaultPage;

const MobileFilter = () => {
    const dispatch = useDispatch();
    const { products = [], grades = [] } = useSelector(getMarketPlaceData);

    const onChange = (id) => {
        if (grades.includes(id)) {
            dispatch(getListingsByGrade(id));
            Router.replace('/auctions', '/auctions?gradeId=' + id, {
                shallow: true,
            });
        } else {
            Router.replace('/auctions', '/auctions?productId=' + id, {
                shallow: true,
            });
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
