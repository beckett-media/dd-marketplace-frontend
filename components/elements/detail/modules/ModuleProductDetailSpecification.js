import React from 'react';
import Link from 'next/link';

const ModuleProductDetailSpecification = ({ product }) => {
    console.log('product: ModuleProductDetailSpecification', product);
    return (
        <div className="ps-product__specification">
            {/* <Link href="/page/blank">
            <a className="report">Report Abuse</a>
        </Link> */}
            {/* <p>
            <strong>SKU:</strong> SF1133569600-1
        </p> */}
            {/* <p className="categories">
            <strong> Categories:</strong>
            <Link href="/shop">
                <a>Consumer Electronics</a>
            </Link>
            <Link href="/shop">
                <a>Refrigerator</a>
            </Link>
            <Link href="/shop">
                <a>Babies & Moms</a>
            </Link>
        </p> */}
            <p className="tags">
                <strong>Tags: </strong>

                {(product?.tags || []).map((tag) => {
                    return (
                        <Link href="/shop">
                            <a>{tag}</a>
                        </Link>
                    );
                })}
            </p>
            <p className="tags">
                <strong> Player Names: </strong>

                {(product?.playerNames || []).map((tag) => {
                    return (
                        <Link href="/shop">
                            <a>{tag}</a>
                        </Link>
                    );
                })}
            </p>
        </div>
    );
};

export default ModuleProductDetailSpecification;
