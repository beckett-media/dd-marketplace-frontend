import React from 'react';
import Link from 'next/link';
import { StrapiProductThumbnail } from '~/utilities/product-helper';
import ModuleProductWideActions from '~/components/elements/products/modules/ModuleProductWideActions';

import { useSelector } from 'react-redux';

const ProductWide = ({ product, unClaimed }) => {
    let grade = useSelector(({ home }) =>
        home?.marketPlace?.grades?.find((grade) => grade._id === product.grade)
    );
    let packaging = useSelector(({ home }) =>
        home?.marketPlace?.products?.find((p) => p._id === product.product)
    );
    return (
        <div className="ps-product ps-product--wide">
            <div className="ps-product__thumbnail">
                {StrapiProductThumbnail(product, unClaimed)}
            </div>
            <div className="ps-product__container">
                <div className="ps-product__content">
                    <>
                        <span>{product.title}</span>
                        <p className={'my-3 ps-product__player'}>
                            {product.playerNames.join(',')}
                        </p>
                    </>
                    <div className="ps-product__meta" style={{ marginTop: 40 }}>
                        <div>
                            <span>Packaging</span>
                            <p>
                                <strong className="text-secondary">
                                    {packaging?.name}
                                </strong>
                            </p>
                        </div>
                        <div>
                            <span>Grade</span>
                            <p>
                                <strong className="text-secondary">
                                    {grade?.name}
                                </strong>
                            </p>
                        </div>
                    </div>
                </div>

                <ModuleProductWideActions product={product} unClaimed={unClaimed} />
            </div>
        </div>
    );
};

export default ProductWide;
