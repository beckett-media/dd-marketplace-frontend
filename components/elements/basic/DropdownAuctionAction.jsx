import React from 'react';
import { Tooltip } from 'antd';
import moment from 'moment';
import Router from 'next/router';

const DropdownAuctionAction = ({ isUserBidHighest, itemToHandle }) => {
    const isWinner = isUserBidHighest && moment(itemToHandle.bidEnd) < moment();

    return (
        <>
            <Tooltip title="Show Auction">
                <span
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        Router.push(`/auction-product/${itemToHandle._id}`);
                    }}>
                    <i className="icon-eye mr-2"></i>
                </span>
            </Tooltip>
            <Tooltip
                title={
                    isWinner
                        ? itemToHandle.orderId
                            ? 'Already Paid, Visit Orders'
                            : 'Pay'
                        : 'Paymemt: Bid has not ended yet or you lost'
                }>
                <span
                    style={
                        isWinner
                            ? itemToHandle.orderId
                                ? { cursor: 'not-allowed' }
                                : { cursor: 'pointer' }
                            : { cursor: 'not-allowed' }
                    }
                    onClick={() => {
                        if (!itemToHandle.orderId && isWinner)
                            Router.push({
                                pathname: '/account/checkout-auction',
                                query: { id_: itemToHandle._id },
                            });
                    }}>
                    <i className="icon-credit-card mr-2"></i>
                </span>
            </Tooltip>
        </>
    );
};

export default DropdownAuctionAction;
