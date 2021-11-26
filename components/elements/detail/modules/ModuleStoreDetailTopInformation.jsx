import React from 'react';
import Link from 'next/link';
import Rating from '~/components/elements/Rating';

const ModuleDetailTopInformation = ({ product }) => {
    return (
        <header>
            {product.user ? (
                <p>Store already claimed</p>
            ) : (
                <p>Store open for claim</p>
            )}
            <h2 className="ps-product__main-title">{product.title}</h2>
            <p>{product.desc}</p>
        </header>
    );
};

export default ModuleDetailTopInformation;
