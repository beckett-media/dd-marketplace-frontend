import React from 'react';
import Link from 'next/link';
import {
    StrapiProductPrice,
    StrapiProductThumbnail,
} from '~/utilities/product-helper';
import { useSelector } from 'react-redux';

const ProductHorizontal = ({ product, unClaimed }) => {
    console.log('unClaimed');
    console.log(unClaimed);
    let grade = useSelector(({ home }) =>
        home?.marketPlace?.grades?.find((grade) => grade._id === product.grade)
    );
    let packaging = useSelector(({ home }) =>
        home?.marketPlace?.products?.find((p) => p._id === product.product)
    );

    if (!unClaimed) {
        return (
            <Link
                href={!unClaimed ? '#' : '/product/[pid]'}
                as={!unClaimed ? '#' : `/product/${product._id || product.id}`}>
                <div className="ps-product--horizontal">
                    <div className="ps-product__thumbnail">
                        {StrapiProductThumbnail(product)}
                    </div>
                    <div className="ps-product__content">
                        <>
                            <span>{product.title}</span>
                            <p className={'my-3 ps-product__player'}>
                                {product.playerNames.join(',')}
                            </p>
                        </>
                        <div
                            className="ps-product__meta-wrapper"
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
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
                            </div>
                            <div>{StrapiProductPrice(product)}</div>
                        </div>
                    </div>
                </div>
            </Link>
        );
    } else {
        return (
            <div className="ps-product--horizontal">
                <div className="ps-product__thumbnail">
                    {StrapiProductThumbnail(product, unClaimed)}
                </div>
                <div className="ps-product__content">
                    <>
                        <span>{product.title}</span>
                        <p className={'my-3 ps-product__player'}>
                            {product.playerNames.join(',')}
                        </p>
                    </>
                    <div
                        className="ps-product__meta-wrapper"
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
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
                        </div>
                        <div>{StrapiProductPrice(product)}</div>
                    </div>
                </div>
            </div>
        );
    }
};

export default ProductHorizontal;
