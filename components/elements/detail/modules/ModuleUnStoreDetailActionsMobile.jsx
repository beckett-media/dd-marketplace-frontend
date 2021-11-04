import React from 'react';

const ModuleUnDetailActionsMobile = ({ product }) => {
    return (
        <div className="ps-product__actions-mobile">
            {product.user ? (
                <a
                    className="ps-btn ps-btn--black"
                    href={`/store/${product._id}`}>
                    Visit this Store
                </a>
            ) : (
                <a
                    className="ps-btn ps-btn--black"
                    href={`https://seller.duedilly.co/account/register?claim=${product._id}`}>
                    Claim this Store
                </a>
            )}
        </div>
    );
};

export default ModuleUnDetailActionsMobile;
