import React, { useEffect, useState } from 'react';
import { addItem } from '~/store/cart/action';
import { addItemToCompare } from '~/store/compare/action';
import { addItemToWishlist } from '~/store/wishlist/action';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import LoginModal from '~/components/login';
import Countdown from 'react-countdown';
import { connect } from 'react-redux';
import BiddingModal from '~/components/biddingModal';
import StripeConnect from '~/components/partials/account/stripeConnectModal';
import { Tag } from 'antd';
import { getDifferenceInDays, isBidStarted } from '~/utilities/time';
import {
    CheckCircleOutlined,
    SyncOutlined,
    ClockCircleOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import { getUserStripeId, getUserInfo } from '~/store/auth/selectors';
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
        const endDate = moment(bidEnd).format('dddd, MMMM Do YYYY, h:mm:ss a');
        const startDate = moment(bidStart).format(
            'dddd, MMMM Do YYYY, h:mm:ss a'
        );
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                    marginTop: -20,
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
                        icon={<ClockCircleOutlined />}
                        color="warning">
                        About to Start
                    </Tag>
                </div>
                {getDifferenceInDays(bidStart) < 1 ? (
                    <div>
                        <p style={{ color: '#7A8088' }}>
                            Time left to start : {hours} : {minutes} : {seconds}
                        </p>
                    </div>
                ) : (
                    <div>
                        <p style={{ color: '#7A8088' }}>
                            Starting in: {startDate}
                        </p>
                        <p style={{ color: '#7A8088', marginTop: 2 }}>
                            Ending in: {endDate}
                        </p>
                    </div>
                )}
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
                        marginTop: -20,
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
        const endDate = moment(bidEnd).format('dddd, MMMM Do YYYY, h:mm:ss a');
        const startDate = moment(bidStart).format(
            'dddd, MMMM Do YYYY, h:mm:ss a'
        );
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                    marginTop: -20,
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
                        icon={<SyncOutlined spin />}
                        color="processing">
                        Auction is live
                    </Tag>
                </div>
                <div>
                    <p style={{ color: '#7A8088' }}>
                        Place higher bid before you lose your chance
                    </p>
                    <p style={{ color: '#7A8088' }}>
                        Ending in:
                        {getDifferenceInDays(bidEnd) < 1 ? (
                            <span style={{ marginLeft: 7 }}>
                                {hours} : {minutes} : {seconds}{' '}
                            </span>
                        ) : (
                            <span style={{ marginLeft: 7 }}>{endDate}</span>
                        )}
                    </p>
                </div>
            </div>
        );
    };

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
                                {product.auctionDetails.bids[0]?.bidAmount
                                    ? 'CURRENT BID'
                                    : 'STARTING BID'}
                                <p
                                    style={{
                                        color: '#2572E1',
                                        fontSize: '32px',
                                        marginTop: '8px',
                                    }}>
                                    {`$${
                                        product.auctionDetails.bids[0]
                                            ?.bidAmount ||
                                        product.auctionDetails.startingBid
                                    }`}
                                </p>
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
                            </p>
                            {props.auth.isLoggedIn ? (
                                props.stripeId ? (
                                    <BiddingModal
                                        open={open}
                                        width={700}
                                        setOpen={setOpen}
                                        auctionDetails={product.auctionDetails}
                                        placeBid={placeBid}
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
                                    disabled={user?.id != product?.seller?._id}>
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
