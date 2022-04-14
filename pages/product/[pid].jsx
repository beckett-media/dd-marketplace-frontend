import { LeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ProductDetailFullwidth from '~/components/elements/detail/ProductDetailFullwidth';
import SkeletonProductDetail from '~/components/elements/skeletons/SkeletonProductDetail';
import ContainerProductDetail from '~/components/layouts/ContainerProductDetail';
import HeaderDefault from '~/components/shared/headers/HeaderDefault';
import HeaderProduct from '~/components/shared/headers/HeaderProduct';
import ProductRepository from '~/repositories/ProductRepository';
import { getMarketPlaceDetails } from '~/store/home/action';

const ProductDefaultPage = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { pid } = router.query;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);

    async function getProduct(pid) {
        setLoading(true);
        const responseData = await ProductRepository.getProductsById(pid);
        const payload = responseData?.data?.cardDetail[0];
        if (payload) {
            setProduct(payload);
            setTimeout(
                function () {
                    setLoading(false);
                }.bind(this),
                250
            );
        }
    }

    useEffect(() => {
        dispatch(getMarketPlaceDetails());
    }, []);

    useEffect(() => {
        if (pid) getProduct(pid);
    }, [pid]);

    let productView, headerView;
    if (!loading) {
        if (product) {
            productView = <ProductDetailFullwidth product={product} />;
            headerView = <HeaderProduct product={product} />;
        } else {
            headerView = <HeaderDefault />;
        }
    } else {
        productView = <SkeletonProductDetail />;
    }
    return (
        <ContainerProductDetail title={product ? product.title : 'Loading...'}>
            {headerView}
            <div className="ps-page--product">
                <div className="ps-container">
                    <div
                        className={'ps-page__back'}
                        onClick={() => {
                            router.back();
                        }}>
                        <LeftOutlined />
                        <p style={{ color: '#fff', fontSize: '20px' }}>
                            Back to MarketPlace
                        </p>
                    </div>

                    <div className="ps-page__container">
                        <div className="ps-page__left">{productView}</div>
                    </div>
                </div>
            </div>
        </ContainerProductDetail>
    );
};

export default ProductDefaultPage;
