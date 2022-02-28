import React from 'react';
import { Tooltip, Popconfirm } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';

const DropdownAuctionAction = ({ isUserBidHighest, itemToHandle }) => {
    let paymentAllowed =
        isUserBidHighest && moment(itemToHandle.bidEnd) < moment();

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
                    paymentAllowed
                        ? 'Pay'
                        : 'Paymemt: Bid has not ended yet or you lost'
                }>
                <span
                    style={
                        paymentAllowed
                            ? { cursor: 'pointer' }
                            : { cursor: 'not-allowed' }
                    }
                    onClick={() => {
                        if (paymentAllowed)
                            Router.push({
                                pathname: '/account/checkout-auction',
                                state: {
                                    itemToHandle,
                                },
                            });
                    }}>
                    <i className="icon-credit-card mr-2"></i>
                </span>
            </Tooltip>
        </>
    );
};

export default DropdownAuctionAction;
