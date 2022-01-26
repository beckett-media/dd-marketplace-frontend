import React from 'react';
import Link from 'next/link';
import {
    StrapiProductPrice,
    StrapiProductThumbnail,
} from '~/utilities/product-helper';
import { useSelector } from 'react-redux';
import { cardFACURL } from '~/repositories/Repository';

const ProductHorizontal = ({ product }) => {
    let grade = useSelector(({ home }) =>
        home?.marketPlace?.grades?.find((grade) => grade._id === product.grade)
    );
    let packaging = useSelector(({ home }) =>
        home?.marketPlace?.products?.find((p) => p._id === product.product)
    );

    return (
        <div className="ps-product--horizontal">
            <Link
                href="/product/[pid]"
                as={`/product/${product._id || product.id}`}>
                <div className="ps-product__thumbnail">
                    {StrapiProductThumbnail(product)}
                </div>
            </Link>
            <div className="ps-product__content">
                <Link
                    href="/product/[pid]"
                    as={`/product/${product._id || product.id}`}>
                    <>
                        <>
                            <span>{product.title}</span>
                            <p className={'my-3 ps-product__player'}>
                                {product.playerNames.join(',')}
                            </p>
                        </>
                        <hr />
                    </>
                </Link>
                <div
                    className="ps-product__meta-wrapper"
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                    <div className="ps-product__meta">
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
                        {product.card && (
                            <div>
                                <a
                                    target="_blank"
                                    href={`${cardFACURL}/${product.card._id}`}>
                                    View SNAPSCORE&trade; Report
                                </a>
                            </div>
                        )}
                    </div>
                </div>
                <div>{StrapiProductPrice(product)}</div>
            </div>
        </div>
    );
};

export default ProductHorizontal;
