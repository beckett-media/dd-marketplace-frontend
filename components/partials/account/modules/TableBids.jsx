import React, { useState } from 'react';
import { Table, Tag } from 'antd';
import moment from 'moment';
import {
    CheckCircleOutlined,
    SyncOutlined,
    ClockCircleOutlined,
    CodeSandboxOutlined,
} from '@ant-design/icons';

import DropdownAuctionAction from '~/components/elements/basic/DropdownAuctionAction';
import { baseUrl, s3baseURL } from '~/repositories/Repository';

const TableAuctionListing = ({ list = [], userId }) => {
    const tableData = list;

    let locale = {
        emptyText: (
            <div>
                <CodeSandboxOutlined
                    style={{ fontSize: 50, marginBottom: 20 }}
                />{' '}
                <p>NOTHING TO SHOW HERE</p>
            </div>
        ),
    };

    const checkStatus = (bidStart, bidEnd) => {
        if (moment().isBefore(bidStart)) return 'pending';
        else if (moment().isBetween(bidStart, bidEnd)) return 'active';
        else return 'completed';
    };

    const renderStatus = (bidStart, bidEnd) => {
        const status = checkStatus(bidStart, bidEnd);
        switch (status) {
            case 'active':
                return (
                    <Tag icon={<SyncOutlined spin />} color="processing">
                        Active
                    </Tag>
                );
            case 'pending':
                return (
                    <Tag icon={<ClockCircleOutlined />} color="default">
                        pending
                    </Tag>
                );
            case 'completed':
                return (
                    <Tag icon={<CheckCircleOutlined />} color="success">
                        completed
                    </Tag>
                );
        }
    };

    const tableColumn = [
        {
            title: '',
            rowKey: 'thumbnail',
            dataIndex: 'thumbnail',
            key: 'thumbnail',
            width: '50px',
            render: (_text, item) => (
                <>
                    {item.listing.images?.length > 0 ? (
                        <img
                            width={50}
                            src={
                                (item.listing.images[0]?.startsWith &&
                                item.listing.images[0].startsWith('card')
                                    ? s3baseURL
                                    : baseUrl) + `/${item.listing.images[0]}`
                            }
                        />
                    ) : (
                        <div
                            style={{
                                width: 50,
                                height: 75,
                                background: '#ccc',
                            }}></div>
                    )}
                </>
            ),
        },

        {
            title: 'Players',
            rowKey: 'PlayerNames',
            dataIndex: 'PlayerNames',
            key: 'PlayerNames',
            render: (_text, item) => {
                return (
                    <>
                        <p className="ps-item-categories m-0">
                            {item.listing.playerNames.map((tag) => (
                                <a key={tag}>{tag}</a>
                            ))}
                        </p>
                    </>
                );
            },
        },
        {
            title: 'Name',
            dataIndex: 'Name',
            rowKey: 'Name',
            key: 'Name',
            width: '20%',
            render: (_text, record) => (
                <>
                    <small className="text-secondary" style={{ opacity: 0.5 }}>
                        {record.id}
                    </small>
                    <p>{record.listing.title}</p>
                </>
            ),
        },
        {
            title: 'Current Bid',
            rowKey: 'Price',
            dataIndex: 'Price',
            key: 'Price',
            render: (_text, item) =>
                item.bids[0] ? (
                    <strong>${item.bids[0].bidAmount || 'N/A'}</strong>
                ) : (
                    ''
                ),
        },

        {
            title: 'Starting Bid',
            rowKey: 'Price',
            dataIndex: 'Price',
            key: 'Price',
            render: (_text, item) =>
                item.startingBid ? (
                    <strong>${item.startingBid || 'N/A'}</strong>
                ) : (
                    ''
                ),
        },
        {
            title: 'Your Highest Bid',
            rowKey: 'yourHighest',
            dataIndex: 'yourHighest',
            key: 'yourHighest',
            render: (_text, item) => {
                let userHighestBid = item.bids.find(
                    (bid) => bid.bidder == userId
                );
                return <strong>${userHighestBid.bidAmount || 'N/A'}</strong>;
            },
        },

        {
            title: 'Start Date',
            rowKey: 'Date',
            dataIndex: 'Date',
            key: 'Date',
            render: (_text, item) =>
                moment(item.bidStart).format('DD-MM-YYYY HH:mm:ss'),
        },
        {
            title: 'End Date',
            rowKey: 'Date',
            dataIndex: 'Date',
            key: 'Date',
            render: (_text, item) =>
                moment(item.bidEnd).format('DD-MM-YYYY HH:mm:ss'),
        },
        {
            title: 'Actions',
            rowKey: 'menu',
            dataIndex: 'menu',
            key: 'menu',
            render: (_text, item) => (
                <DropdownAuctionAction
                    itemToHandle={item}
                    isUserBidHighest={item.bids[0].bidder == userId}
                />
            ),
        },
        {
            title: 'Status',
            rowKey: 'menu',
            dataIndex: 'menu',
            key: 'menu',
            render: (_text, item) => renderStatus(item.bidStart, item.bidEnd),
        },
    ];
    return (
        <div className="table-responsive">
            <Table
                className="product-table"
                locale={locale}
                columns={tableColumn}
                dataSource={tableData}
                rowKey={(record) => record.id || record._id}
            />
        </div>
    );
};

export default TableAuctionListing;
