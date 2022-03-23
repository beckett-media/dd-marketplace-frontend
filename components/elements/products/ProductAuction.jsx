import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import moment from 'moment';
import { Tag } from 'antd';
import {
    CheckCircleOutlined,
    SyncOutlined,
    ClockCircleOutlined,
    CheckCircleTwoTone,
    ClockCircleTwoTone,
} from '@ant-design/icons';
import { StrapiProductThumbnail } from '~/utilities/product-helper';
import { useSelector } from 'react-redux';
import Countdown from 'react-countdown';
import { isBidStarted, getDifferenceInDays } from '~/utilities/time';

const ProductAuctionHorizontal = ({ auction }) => {
    const [bidActive, setBidActive] = useState(false);
    const { bidEnd, bidStart } = auction || {};
    let grade = useSelector(({ home }) =>
        home?.marketPlace?.grades?.find(
            (grade) => grade._id === auction.listing?.grade
        )
    );
    let packaging = useSelector(({ home }) =>
        home?.marketPlace?.products?.find(
            (p) => p._id === auction.listing?.product
        )
    );
    useEffect(() => {
        if (isBidStarted(bidStart, bidEnd)) {
            setBidActive(true);
        } else {
            setBidActive(false);
        }
    }, []);

    const beforeStartRenderer = ({ hours, minutes, seconds, completed }) => {
        const startDate = moment(bidStart).format(
            'dddd, MMMM Do YYYY, h:mm:ss a'
        );

        if (getDifferenceInDays(bidStart) < 1)
            return (
                <>
                    <ClockCircleTwoTone
                        style={{
                            marginTop: -15,
                            marginRight: 5,
                            fontSize: '15px',
                        }}
                    />
                    <p style={{ color: '#7A8088' }}>
                        Time left to start : {hours} : {minutes} : {seconds}
                    </p>
                </>
            );
        else
            return <p style={{ color: '#7A8088' }}>Starting in: {startDate}</p>;
    };

    const bidEndingRenderer = ({ hours, minutes, seconds, completed }) => {
        const endDate = moment(bidEnd).format('dddd, MMMM Do YYYY, h:mm:ss a');

        if (completed) {
            return (
                <>
                    <CheckCircleTwoTone
                        style={{
                            marginTop: -15,
                            marginRight: 5,
                            fontSize: '15px',
                        }}
                        twoToneColor="#52c41a"
                    />
                    <p style={{ color: '#7A8088', alignItems: 'center' }}>
                        This Auction has been closed.
                    </p>
                </>
            );
        }
        return (
            <>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'row',
                        }}>
                        <SyncOutlined
                            style={{
                                marginTop: -15,
                                marginRight: 5,
                                fontSize: '15px',
                            }}
                            spin
                        />
                        <p style={{ color: '#7A8088' }}>Ending In:</p>
                    </div>
                    <p style={{ color: '#7A8088', marginTop: -10 }}>
                        {getDifferenceInDays(bidEnd) < 1 ? (
                            <span style={{ marginLeft: 7 }}>
                                {hours} : {minutes} : {seconds}{' '}
                            </span>
                        ) : (
                            <span style={{ marginLeft: 7 }}>{endDate}</span>
                        )}
                    </p>
                </div>
            </>
        );
    };

    return (
        <Link
            href={'/auction-product/[pid]'}
            as={`/auction-product/${auction._id}`}>
            <div className="ps-product--horizontal">
                <div className="ps-product__thumbnail">
                    {StrapiProductThumbnail(
                        auction.listing,
                        false,
                        auction._id
                    )}
                </div>
                <div className="ps-product__content">
                    <>
                        <span>{auction.listing?.title}</span>
                        <p className={'my-3 ps-product__player'}>
                            {auction.listing?.playerNames.join(',')}
                        </p>
                    </>
                    <div
                        className="ps-product__meta-wrapper"
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}>
                        <div className="ps-product__meta">
                            <div>
                                <span>Packaging</span>
                                <p>
                                    <strong className="text-secondary">
                                        {packaging?.name}
                                    </strong>
                                </p>
                            </div>
                            <div>
                                <span>Grade</span>
                                <p>
                                    <strong className="text-secondary">
                                        {grade?.name}
                                    </strong>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        alignItems: 'center',
                        color: '#7A8088',
                        padding: '20px',
                    }}>
                    <span
                        style={{
                            fontSize: '2.5rem',
                        }}>
                        {auction.bids.length > 0
                            ? 'Current Bid:  '
                            : 'Starting Bid:  '}
                        <span className="ps-product__price">
                            {`  $${
                                auction.bids[0]?.bidAmount ||
                                auction.startingBid
                            }`}
                        </span>
                    </span>
                </div>
                <hr />

                <div
                    style={{
                        fontSize: '16px',
                        textAlign: 'center',
                    }}>
                    {auction.bids.length}
                    {auction.bids.length > 1 ? ' Bids Placed' : ' Bid Placed'}
                </div>
                <hr />
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#7A8088',
                    }}>
                    {bidActive && (
                        <Countdown date={bidEnd} renderer={bidEndingRenderer} />
                    )}

                    {!bidActive && (
                        <Countdown
                            date={bidStart}
                            renderer={beforeStartRenderer}
                            onComplete={() => {
                                setBidActive(true);
                            }}
                        />
                    )}
                </div>
            </div>
        </Link>
    );
};

export default ProductAuctionHorizontal;
