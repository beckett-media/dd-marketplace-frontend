import { all, call, put, takeLatest } from 'redux-saga/effects';
import { notification } from 'antd';
import CartRespository from '~/repositories/CartRespository';

import {
    actionTypes,
    getCartError,
    getCartSuccess,
    updateCartSuccess,
    updateCartError,
    getCart,
} from './action';

const modalSuccess = (type) => {
    notification[type]({
        message: 'Success',
        description: 'This product has been added to your cart!',
        duration: 1,
    });
};
const modalWarning = (type) => {
    notification[type]({
        message: 'Remove A Item',
        description: 'This product has been removed from your cart!',
        duration: 1,
    });
};

export const calculateAmount = (obj) =>
    Object.values(obj)
        .reduce((acc, { cartCount, price }) => {
            console.log('price: ', price);
            return acc + Number(cartCount) * Number(price);
        }, 0)
        .toFixed(2);

function* getCartSaga() {
    try {
        const cartFromServer = yield call(CartRespository.getCart);

        if (cartFromServer?.data?.carts && cartFromServer.data.carts.length) {
            const cart = cartFromServer.data.carts.map((i) => ({
                ...i.listing,
                cartCount: 1,
                cartId: i.id,
            }));

            const amount = calculateAmount(cart);
            console.log('amount: ', amount);

            yield put(getCartSuccess(cart, amount));
        } else {
            yield put(getCartSuccess([]));
        }
    } catch (err) {
        yield put(getCartError(err));
    }
}

function* addItemSaga(payload) {
    try {
        const { product } = payload;

        const localCart = JSON.parse(localStorage.getItem('persist:martfury'))
            .cart;
        let currentCart = JSON.parse(localCart);
        let existItem = currentCart.cartItems.find(
            (item) => item._id === product._id
        );

        if (existItem) {
            // existItem.cartCount += product.cartCount;
        } else {
            if (!product.cartCount) {
                product.cartCount = 1;
            }

            yield call(CartRespository.addToCart, product._id);

            currentCart.cartItems.push(product);
        }
        currentCart.amount = calculateAmount(currentCart.cartItems);
        currentCart.cartTotal++;

        ///add api call here

        yield put(updateCartSuccess(currentCart));

        yield put(getCart());

        modalSuccess('success');
    } catch (err) {
        yield put(getCartError(err));
    }
}

function* removeItemSaga(payload) {
    try {
        const { product } = payload;
        let localCart = JSON.parse(
            JSON.parse(localStorage.getItem('persist:martfury')).cart
        );
        let index = localCart.cartItems.findIndex(
            (item) => item._id === product._id
        );
        const item = localCart.cartItems[index];

        yield call(CartRespository.removeToCart, item.cartId);

        localCart.cartTotal = localCart.cartTotal - product.cartCount;
        localCart.cartItems.splice(index, 1);
        localCart.amount = calculateAmount(localCart.cartItems);
        if (localCart.cartItems.length === 0) {
            localCart.cartItems = [];
            localCart.amount = 0;
            localCart.cartTotal = 0;
        }

        ///add api call here

        yield put(updateCartSuccess(localCart));
        modalWarning('warning');
    } catch (err) {
        yield put(getCartError(err));
    }
}

function* increaseQtySaga(payload) {
    try {
        const { product } = payload;
        let localCart = JSON.parse(
            JSON.parse(localStorage.getItem('persist:martfury')).cart
        );
        let selectedItem = localCart.cartItems.find(
            (item) => item._id === product._id
        );
        if (selectedItem) {
            selectedItem.cartCount++;
            localCart.cartTotal++;
            localCart.amount = calculateAmount(localCart.cartItems);
        }
        yield put(updateCartSuccess(localCart));
    } catch (err) {
        yield put(getCartError(err));
    }
}

function* decreaseItemQtySaga(payload) {
    try {
        const { product } = payload;
        const localCart = JSON.parse(
            JSON.parse(localStorage.getItem('persist:martfury')).cart
        );
        let selectedItem = localCart.cartItems.find(
            (item) => item._id === product._id
        );

        if (selectedItem) {
            selectedItem.cartCount--;
            localCart.cartTotal--;
            localCart.amount = calculateAmount(localCart.cartItems);
        }
        yield put(updateCartSuccess(localCart));
    } catch (err) {
        yield put(getCartError(err));
    }
}

function* clearCartSaga() {
    try {
        const emptyCart = {
            cartItems: [],
            amount: 0,
            cartTotal: 0,
        };
        yield put(updateCartSuccess(emptyCart));
    } catch (err) {
        yield put(updateCartError(err));
    }
}

export default function* rootSaga() {
    yield all([takeLatest(actionTypes.GET_CART, getCartSaga)]);
    yield all([takeLatest(actionTypes.ADD_ITEM, addItemSaga)]);
    yield all([takeLatest(actionTypes.REMOVE_ITEM, removeItemSaga)]);
    yield all([takeLatest(actionTypes.INCREASE_QTY, increaseQtySaga)]);
    yield all([takeLatest(actionTypes.DECREASE_QTY, decreaseItemQtySaga)]);
}
