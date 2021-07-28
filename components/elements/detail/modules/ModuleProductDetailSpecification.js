import React from 'react';
import Link from 'next/link';

const ModuleProductDetailSpecification = ({ product }) => {
    return (
        <div className="ps-product__specification">
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
        </div>
    );
};

export default ModuleProductDetailSpecification;
