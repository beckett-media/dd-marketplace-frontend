import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '~/store/cart/action';
import { StrapiProductPrice } from '~/utilities/product-helper';

const ModuleProductWideActions = ({ product, unClaimed }) => {
    const dispatch = useDispatch();

    const handleAddItemToCart = (e) => {
        e.preventDefault();
        if (unClaimed) return;
        dispatch(addItem(product));
    };

    return (
        <div className="ps-product__shopping">
            {StrapiProductPrice(product)}
            <a className="ps-btn" href="#" onClick={handleAddItemToCart}>
                Add to cart
            </a>
            {/* <ul className="ps-product__actions">
                <li>
                    <a href="#" onClick={(e) => handleAddItemToWishlist(e)}>
                        <i className="icon-heart"></i> Wishlist
                    </a>
                </li>
                <li>
                    <a href="#" onClick={(e) => handleAddItemToCompare(e)}>
                        <i className="icon-chart-bars"></i> Compare
                    </a>
                </li>
            </ul> */}
        </div>
    );
};

export default ModuleProductWideActions;
