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
        <div className="ps-product--horizontal">
            <Link href={`/product/${product._id || product.id}`}>
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
                            <p className={'product_title'}>{product.title}</p>
                            <div className={'playerName__price'}>
                                <p className={'my-3 ps-product__player'}>
                                    {product.playerNames.join(',')}
                                </p>

                                <div>{StrapiProductPrice(product)}</div>
                            </div>
                        </>
                        <hr style={{ backgroundColor: '#fff' }} />
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
                    </div>
                </div>
                {product.card && (
                    <div className={'product-snapscore__button'}>
                        <img
                            style={{ width: '20px', height: '20px' }}
                            src="https://img.icons8.com/color/48/000000/bar-chart--v1.png"
                        />
                        <a
                            style={{
                                color: '#37c4ce',
                                textDecoration: 'underline',
                                marginLeft: '5px',
                            }}
                            target="_blank"
                            href={`/snap-score/${product.card._id}`}>
                            View SNAPSCORE&trade; Report
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductHorizontal;
