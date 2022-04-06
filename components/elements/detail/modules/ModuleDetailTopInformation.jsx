import React from 'react';

const ModuleDetailTopInformation = ({ product, bidding }) => {
    // Views
    let priceView;

    if (product.is_sale) {
        priceView = (
            <h4 className="ps-product__price sale">
                <del className="mr-2">&{product.sale_price}</del>$
                {product.price}
            </h4>
        );
    } else {
        priceView = bidding ? (
            ''
        ) : (
            <h4 className="ps-product__price">${product.price}</h4>
        );
    }
    return (
        <header>
            <p className="ps-product__main-title">{product.title}</p>
            <h2 style={{ color: '#fff' }}>{product?.playerNames.join(', ')}</h2>
            <div className="ps-product__meta">
                {/* <p>
                    Seller:
                    <Link href="/shop">
                        <a className="ml-2 text-capitalize">
                            {product.seller.fullName}
                        </a>
                    </Link>
                </p> */}
                {/* <div className="ps-product__rating">
                    <Rating />
                    <span>(1 review)</span>
                </div> */}
            </div>
            {priceView}
        </header>
    );
};

export default ModuleDetailTopInformation;
