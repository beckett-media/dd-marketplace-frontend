import { all } from 'redux-saga/effects';
import PostSaga from './post/saga';
import ProductSaga from './product/saga';
import SettingSaga from './setting/saga';
import CartSaga from './cart/saga';
import AuthSaga from './auth/saga';
import CompareSaga from './compare/saga';
import WishlistSaga from './wishlist/saga';
import CollectionSaga from './collection/saga';
import MediaSaga from './media/saga';
import App from './app/saga';
import HomeSaga from './home/saga';
import CheckOutSaga from './checkout/saga';
import UserInfoSaga from './userInfo/saga';
import InvoiceSaga from './invoices/saga';
import AuctionSaga from './auction/saga';

export default function* rootSaga() {
    yield all([
        PostSaga(),
        ProductSaga(),
        SettingSaga(),
        CartSaga(),
        AuthSaga(),
        CompareSaga(),
        WishlistSaga(),
        CollectionSaga(),
        MediaSaga(),
        App(),
        HomeSaga(),
        CheckOutSaga(),
        UserInfoSaga(),
        InvoiceSaga(),
        AuctionSaga(),
    ]);
}
