import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';

import {
    StrapiProductPrice,
    StrapiProductThumbnail,
} from '~/utilities/product-helper';

const ProductSearchResult = ({ product }) => {
    let grade = useSelector(({ home }) =>
        home?.marketPlace?.grades?.find((grade) => grade._id === product.grade)
    );

    return (
        <Link href="/product/[pid]" as={`/product/${product._id}`}>
            <div
                className="ps-product ps-product--wide ps-product--search-result"
                style={{
                    cursor: 'pointer',
                }}>
                <div className="ps-product__thumbnail">
                    {StrapiProductThumbnail(product)}
                </div>
                <div className="ps-product__content">
                    <Link href="/product/[pid]" as={`/product/${product._id}`}>
                        <a className="ps-product__title">{product.title}</a>
                    </Link>
                    <></>
                    <div className="ps-product__meta" style={{ marginTop: 40 }}>
                        <div>
                            <span>Players</span>
                            <p>
                                <strong className="text-secondary">
                                    <p className="text-secondary">
                                        {product.playerNames.join(',')}
                                    </p>
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

                        <div>
                            <span>Brand</span>
                            <p>
                                <strong className="text-secondary">
                                    {product.brand}
                                </strong>
                            </p>
                        </div>
                    </div>
                </div>
                {StrapiProductPrice(product)}
            </div>
        </Link>
    );
};
export default ProductSearchResult;
