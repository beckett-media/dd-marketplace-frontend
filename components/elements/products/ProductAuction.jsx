import React from 'react';
import Link from 'next/link';
import moment from 'moment';
import { Tag } from 'antd';
import {
    CheckCircleOutlined,
    SyncOutlined,
    ClockCircleOutlined,
} from '@ant-design/icons';
import { StrapiProductThumbnail } from '~/utilities/product-helper';
import { useSelector } from 'react-redux';
import Countdown from 'react-countdown';
import { bidStarted } from '~/utilities/time';

const ProductAuctionHorizontal = ({ auction }) => {
    let grade = useSelector(({ home }) =>
        home?.marketPlace?.grades?.find(
            (grade) => grade._id === auction.listing.grade
        )
    );
    let packaging = useSelector(({ home }) =>
        home?.marketPlace?.products?.find(
            (p) => p._id === auction.listing.product
        )
    );

    const { bidEnd, bidStart } = auction || {};

    const beforeStartRenderer = () => {
        return (
            <div>
                <Tag
                    style={{
                        fontSize: '15px',
                    }}
                    icon={<ClockCircleOutlined />}
                    color="warning">
                    Start on: {bidStart}
                </Tag>
            </div>
        );
    };

    const bidEndingRenderer = ({ completed }) => {
        if (completed) {
            return (
                <div>
                    <Tag
                        style={{
                            fontSize: '15px',
                        }}
                        icon={<CheckCircleOutlined />}
                        color="success">
                        Bidding Ended
                    </Tag>
                </div>
            );
        } else {
            return (
                <div>
                    <Tag
                        style={{
                            fontSize: '15px',
                        }}
                        icon={<SyncOutlined spin />}
                        color="processing">
                        Auction ongoing
                    </Tag>
                </div>
            );
        }
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
                        <span>{auction.listing.title}</span>
                        <p className={'my-3 ps-product__player'}>
                            {auction.listing.playerNames.join(',')}
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
                        textAlign: 'center',
                        marginBottom: '6px',
                    }}>
                    {bidStarted(bidStart) ? (
                        <Countdown date={bidEnd} renderer={bidEndingRenderer} />
                    ) : (
                        <Countdown
                            date={bidStart}
                            renderer={beforeStartRenderer}
                        />
                    )}
                </div>
            </div>
        </Link>
    );
};

export default ProductAuctionHorizontal;
