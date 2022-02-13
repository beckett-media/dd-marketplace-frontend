import React, { useState } from 'react';
import { addItem } from '~/store/cart/action';
import { addItemToCompare } from '~/store/compare/action';
import { addItemToWishlist } from '~/store/wishlist/action';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import LoginModal from '~/components/login';
import { connect } from 'react-redux';
import BiddingModal from '~/components/biddingModal';
import Countdown from '~/components/countDown';
import moment from 'moment';
const ModuleDetailShoppingActions = ({
    product,
    extended = false,
    placeBid,
    ...props
}) => {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const Router = useRouter();
    const [open, setOpen] = useState(false);

    const handleAddItemToCart = (e) => {
        e.preventDefault();
        let tmp = product;
        tmp.quantity = quantity;
        dispatch(addItem(tmp));
    };

    const handleBuynow = (e) => {
        e.preventDefault();
        let tmp = product;
        tmp.quantity = quantity;
        dispatch(addItem(tmp));
        setTimeout(function () {
            Router.push('/account/checkout');
        }, 1000);
    };

    const handleAddItemToCompare = (e) => {
        e.preventDefault();
        dispatch(addItemToCompare(product));
    };

    const handleAddItemToWishlist = (e) => {
        e.preventDefault();
        const { product } = this.props;
        dispatch(addItemToWishlist(product));
    };

    const handleIncreaseItemQty = (e) => {
        e.preventDefault();
        setQuantity(quantity + 1);
    };

    const handleDecreaseItemQty = (e) => {
        e.preventDefault();
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };
    const endDate=(moment( product.auctionDetails.bidEnd).format("MM DD YYYY, h:mm a"));

    if (!extended) {
        return (
            <div className="ps-product__shopping">
                {product.auctionDetails ? (
                    <>
                        <div>
                            <p style={{ color: '#7A8088' }}>
                                {product.auctionDetails.bids.length} bids placed
                            </p>
                            <p style={{ color: '#7A8088' }}>
                                CURRENT BID{' '}
                                <p
                                    style={{
                                        color: '#2572E1',
                                        fontSize: '32px',
                                        marginTop: '8px',
                                    }}>
                                    {`${
                                        product.auctionDetails.bids[0]
                                            ?.bidAmount ||
                                        product.auctionDetails.startingBid
                                    }$`}
                                </p>
                                <div
                                    style={{
                                        display: 'flex',
                                        color: '#7A8088',
                                        margin: '5px',
                                    }}>
                                    TIME LEFT:{' '}
                                    {/* <CountDown/> */}
                                    
                                    <Countdown
                                        timeTillDate={endDate}
                                        timeFormat="MM DD YYYY, h:mm a"
                                    />
                                </div>
                            </p>
                            {props.isLoggedIn ? (
                                <BiddingModal
                                    open={open}
                                    width={700}
                                    setOpen={setOpen}
                                    auctionDetails={product.auctionDetails}
                                    placeBid={placeBid}
                                />
                            ) : (
                                <LoginModal
                                    width={500}
                                    open={open}
                                    setOpen={setOpen}
                                    bidding={true}
                                />
                            )}
                            <button
                                className="ps-btnBid ps-btnBid--blackBid mb-2"
                                // onClick={(e) => handleAddItemToCart(e)}
                                onClick={() => setOpen(true)}>
                                Place Bid
                            </button>
                        </div>
                    </>
                ) : (
                    <a
                        className="ps-btn ps-btn--black mb-2"
                        href="#"
                        onClick={(e) => handleAddItemToCart(e)}>
                        Add to cart
                    </a>
                )}
                {product.store && (
                    <a className="ps-btn ps-btn--black mb-2">
                        <Link
                            className="ps-btn ps-btn--black mb-2"
                            href={`/store/${product.store}`}>
                            Visit Store To Explore More
                        </Link>
                    </a>
                )}

                <div className="ps-product__actions"></div>
            </div>
        );
    } else {
        return (
            <div className="ps-product__shopping extend">
                <div className="ps-product__btn-group">
                    {!bidding ? (
                        <a
                            className="ps-btn ps-btn--black"
                            href="#"
                            onClick={(e) => handleAddItemToCart(e)}>
                            Add to cart
                        </a>
                    ) : (
                        <button
                            className="ps-btnBid  ps-btn--black mb-2"
                            onClick={() => setOpen(true)}>
                            Place Bid
                        </button>
                    )}
                    <div>
                        <p>No of bids</p>
                        {props.isLoggedIn ? (
                            <BiddingModal
                                open={open}
                                width={700}
                                setOpen={setOpen}
                                auctionDetails={product.auctionDetails}
                            />
                        ) : (
                            <LoginModal
                                width={500}
                                open={open}
                                setOpen={setOpen}
                            />
                        )}
                    </div>
                    <div className="ps-product__actions"></div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return state?.auth || {};
};
export default connect(mapStateToProps)(ModuleDetailShoppingActions);
