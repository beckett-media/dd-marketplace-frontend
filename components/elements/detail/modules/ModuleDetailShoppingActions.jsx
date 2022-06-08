import { CheckCircleOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import { connect, useDispatch } from 'react-redux';
import BiddingModal from '~/components/biddingModal';
import LoginModal from '~/components/login';
import StripeConnect from '~/components/partials/account/stripeConnectModal';
import { getUserInfo, getUserStripeId } from '~/store/auth/selectors';
import { addItem } from '~/store/cart/action';
import { addItemToCompare } from '~/store/compare/action';
import { addItemToWishlist } from '~/store/wishlist/action';
import { getDifferenceInDays, isBidStarted } from '~/utilities/time';
import Timer from '../../common/Timer';
const ModuleDetailShoppingActions = ({
    product,
    extended = false,
    placeBid,
    user,
    ...props
}) => {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const [bidActive, setBidActive] = useState(false);
    const Router = useRouter();
    const [open, setOpen] = useState(false);
    const [showBtn, setShowBtn] = useState(false);
    const { bidEnd, bidStart } = product?.auctionDetails || {};

    useEffect(() => {
        if (isBidStarted(bidStart, bidEnd)) {
            setBidActive(true);
        } else {
            setBidActive(false);
            setShowBtn(false);
        }
    }, []);

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

    const beforeStartRenderer = ({ hours, minutes, seconds, completed }) => {
        return (
            <div>
                <Timer
                    days={getDifferenceInDays(bidStart)}
                    hrs={hours}
                    mins={minutes}
                    sec={seconds}
                />
            </div>
        );
    };

    const bidEndingRenderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            return (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 10,
                        marginTop: 10,
                    }}>
                    <div style={{ justifyContent: 'flex-start' }}>
                        <Tag
                            style={{
                                fontSize: '15px',
                                height: 30,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 180,
                            }}
                            icon={<CheckCircleOutlined />}
                            color="success">
                            Auction Ended
                        </Tag>
                    </div>
                    <p style={{ color: '#7A8088' }}>
                        This Auction has been closed.
                        <br />
                        Stay tuned and hold your money, hot auctions are about
                        to start.
                    </p>
                </div>
            );
        }
        setShowBtn(true);

        return (
            <div>
                <Timer
                    days={getDifferenceInDays(bidEnd)}
                    hrs={hours}
                    mins={minutes}
                    sec={seconds}
                />
            </div>
        );
    };

    if (!extended) {
        return (
            <div className="ps-product__shopping">
                {product.auctionDetails ? (
                    <>
                        <div>
                            <div
                                style={{
                                    display: 'flex',
                                    color: '#7A8088',
                                    margin: '5px',
                                }}>
                                {bidActive && (
                                    <Countdown
                                        date={bidEnd}
                                        renderer={bidEndingRenderer}
                                        onComplete={() => {
                                            setShowBtn(false);
                                        }}
                                    />
                                )}

                                {!bidActive && (
                                    <Countdown
                                        date={bidStart}
                                        renderer={beforeStartRenderer}
                                        onComplete={() => {
                                            setShowBtn(true);
                                            setBidActive(true);
                                        }}
                                    />
                                )}
                            </div>
                            {/* <p style={{ color: '#7A8088' }}>
                                {product.auctionDetails.bids.length} bids placed
                            </p> */}
                            <h6
                                style={{
                                    color: '#636679',
                                    fontWeight: 'normal',
                                }}>
                                {product.auctionDetails.bids[0]?.bidAmount
                                    ? 'CURRENT BID'
                                    : 'STARTING BID'}
                            </h6>
                            <h5
                                style={{
                                    color: '#fff',
                                    fontSize: '22px',
                                    marginTop: '8px',
                                    marginBottom: '20px',
                                    fontWeight: 'normal',
                                }}>
                                {`USD $${
                                    product.auctionDetails.bids[0]?.bidAmount ||
                                    product.auctionDetails.startingBid
                                }`}
                            </h5>
                            {props.auth.isLoggedIn ? (
                                props.stripeId ? (
                                    <BiddingModal
                                        open={open}
                                        width={700}
                                        setOpen={setOpen}
                                        auctionDetails={product.auctionDetails}
                                        placeBid={placeBid}
                                        product={product}
                                        user={props?.auth?.user || {}}
                                    />
                                ) : (
                                    <StripeConnect
                                        visible={open}
                                        onOk={setOpen}
                                        onCancel={setOpen}
                                    />
                                )
                            ) : (
                                <LoginModal
                                    width={500}
                                    open={open}
                                    setOpen={setOpen}
                                    bidding={true}
                                />
                            )}
                            {showBtn && (
                                <button
                                    className="ps-btnBid ps-btnBid--blackBid mb-2"
                                    onClick={() => {
                                        user?.id != product?.seller?._id &&
                                            setOpen(true);
                                    }}
                                    disabled={user?.id == product?.seller?._id}>
                                    {user?.id == product?.seller?._id
                                        ? "You Can't place Bid on your Own Auction"
                                        : 'Place Bid'}
                                </button>
                            )}
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
                            onClick={() => {
                                setOpen(true);
                            }}>
                            Place Bid
                        </button>
                    )}
                    <div>
                        <p>No of bids</p>
                        {props.auth.isLoggedIn ? (
                            <BiddingModal
                                open={open}
                                width={700}
                                setOpen={setOpen}
                                auctionDetails={product.auctionDetails}
                                product={product}
                                user={props?.auth?.user || {}}
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
    return {
        auth: state?.auth || {},
        stripeId: getUserStripeId(state),
        user: getUserInfo(state),
    };
};
export default connect(mapStateToProps)(ModuleDetailShoppingActions);
