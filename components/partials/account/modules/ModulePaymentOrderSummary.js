import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';

const ModulePaymentOrderSummary = ({
    shipping,
    amount,
    cartItems,
    auctionProduct,
}) => {
    let listItemsView, shippingView, totalView;
    if (auctionProduct) {
        listItemsView = (
            <Link href="/">
                <a>
                    <strong>
                        {auctionProduct.title}
                        <br />
                        {auctionProduct.id}
                        {<span>x1</span>}
                    </strong>
                    <small>${auctionProduct.price}</small>
                </a>
            </Link>
        );
    } else if (cartItems && cartItems.length > 0 && !auctionProduct) {
        listItemsView = cartItems.map((product) => (
            <Link href="/" key={product.id}>
                <a>
                    <strong>
                        {product.title}
                        <span>x{product.cartCount}</span>
                    </strong>
                    <small>${product.cartCount * product.price}</small>
                </a>
            </Link>
        ));
    } else {
        listItemsView = <p>No Product.</p>;
    }
    if (shipping === true) {
        shippingView = (
            <figure>
                <figcaption>
                    <strong>Shipping Fee</strong>
                    <small>$20.00</small>
                </figcaption>
            </figure>
        );
        totalView = (
            <figure className="ps-block__total">
                <h3>
                    Total
                    <strong>
                        $
                        {auctionProduct
                            ? auctionProduct.price
                            : parseInt(amount) + 20}
                        .00
                    </strong>
                </h3>
            </figure>
        );
    } else {
        totalView = (
            <figure className="ps-block__total">
                <h3>
                    Total
                    <strong>
                        $
                        {auctionProduct
                            ? auctionProduct.price
                            : Number(amount).toFixed(2)}
                    </strong>
                </h3>
            </figure>
        );
    }
    return (
        <div className="ps-block--checkout-order">
            <div className="ps-block__content">
                <figure>
                    <figcaption>
                        <strong>Product</strong>
                        <strong>total</strong>
                    </figcaption>
                </figure>
                <figure className="ps-block__items">{listItemsView}</figure>
                <figure>
                    <figcaption>
                        <strong>Subtotal</strong>
                        <small>
                            ${auctionProduct ? auctionProduct.price : amount}
                        </small>
                    </figcaption>
                </figure>
                {shippingView}
                {totalView}
            </div>
        </div>
    );
};
export default connect((state) => state.cart)(ModulePaymentOrderSummary);
