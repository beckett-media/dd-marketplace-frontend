import React from 'react';
import Link from 'next/link';
import {
    StrapiProductPrice,
    StrapiProductThumbnail,
} from '~/utilities/product-helper';
import { useSelector } from 'react-redux';

const ProductHorizontal = ({ product }) => {
    let grade = useSelector(({ home }) =>
        home?.marketPlace?.grades?.find((grade) => grade._id === product.grade)
    );
    let packaging = useSelector(({ home }) =>
        home?.marketPlace?.products?.find((p) => p._id === product.product)
    );

    return (
        <Link
            href="/product/[pid]"
            as={`/product/${product._id || product.id}`}>
            <div className="ps-product--horizontal">
                <div className="ps-product__thumbnail">
                    {StrapiProductThumbnail(product)}
                </div>
                <div className="ps-product__content">
                    <>
                        <span>{product.title}</span>
                        <h4 className={'my-3'}>
                            {product.playerNames.join(',')}
                        </h4>
                    </>

                    {StrapiProductPrice(product)}

                    <div className="ps-product__meta">
                        <div>
                            <span>Packaging</span>
                            <p>
                                <strong>{packaging?.name}</strong>
                            </p>
                        </div>
                        <div>
                            <span>Grade</span>
                            <p>
                                <strong>{grade?.name}</strong>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductHorizontal;
