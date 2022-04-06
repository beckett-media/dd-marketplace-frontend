import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ProductDetailAffiliate from '~/components/elements/detail/ProductDetailAffiliate';
import SkeletonProductDetail from '~/components/elements/skeletons/SkeletonProductDetail';
import ContainerPage from '~/components/layouts/ContainerPage';
import CustomerBought from '~/components/partials/product/CustomerBought';
import ProductWidgets from '~/components/partials/product/ProductWidgets';
import RelatedProduct from '~/components/partials/product/RelatedProduct';
import ProductRepository from '~/repositories/ProductRepository';

const ProductDefaultPage = () => {
    const router = useRouter();
    const { pid } = router.query;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);

    async function getProduct(pid) {
        setLoading(true);
        const responseData = await ProductRepository.getProductsById(pid);
        if (responseData) {
            setProduct(responseData);
            setTimeout(
                function () {
                    setLoading(false);
                }.bind(this),
                250
            );
        }
    }

    useEffect(() => {
        getProduct(pid);
    }, [pid]);

    // Views
    let productView;
    if (!loading) {
        if (product) {
            productView = <ProductDetailAffiliate product={product} />;
        }
    } else {
        productView = <SkeletonProductDetail />;
    }

    return (
        <ContainerPage title="Product Afilliate" boxed={true}>
            <div className="ps-page--product">
                <div className="ps-container">
                    <div className="ps-page__container">
                        <div className="ps-page__left">{productView}</div>
                        <div className="ps-page__right">
                            <ProductWidgets />
                        </div>
                    </div>

                    <CustomerBought
                        layout="fullwidth"
                        collectionSlug="deal-of-the-day"
                    />
                    <RelatedProduct collectionSlug="shop-recommend-items" />
                </div>
            </div>
        </ContainerPage>
    );
};

export default ProductDefaultPage;
