import React, { Component } from 'react';
import { Table, Divider, Tag } from 'antd';
import Link from 'next/link';
const dayjs = require('dayjs');

class TableInvoices extends Component {
    render() {
        /*
            You can change data by API
            example: https://ant.design/components/table/
        */
        const { orders = [] } = this.props;

        const tableData = orders;
        const tableColumn = [
            {
                title: 'Id',
                dataIndex: 'id',
                rowKey: 'id',
                key: 'invoiceId',
                width: '120px',
                render: (text, record) =>
                    record?.invoiceId || record?.orderId || '',
            },
            {
                title: 'Product',
                dataIndex: 'listing.title',
                rowKey: 'title',
                key: 'title',
                render: (text, record) => {
                    let productTitle = '';

                    record.items.forEach(({ title, quantity }) => {
                        productTitle += `${title} x ${quantity} \n`;
                    });

                    return (
                        <>
                            {record.auctionId && (
                                <small
                                    className="text-secondary"
                                    style={{ opacity: 0.5 }}>
                                    {'Auction Order '}
                                    {record.auctionId}
                                </small>
                            )}
                            <p>{productTitle || ''}</p>
                        </>
                    );
                },
            },
            {
                title: 'Price',
                rowKey: 'datePrice',
                dataIndex: 'datePrice',
                key: 'datePrice',
                width: '120px',
                render: (text, record) => `$${record.price}`,
            },

            {
                title: 'Date',
                rowKey: 'dateCreate',
                dataIndex: 'dateCreate',
                key: 'dateCreate',
                width: '120px',
                render: (text, record) =>
                    dayjs(record?.date || new Date()).format('DD-MMM-YYYY'),
            },

            {
                title: 'Status',
                key: 'status',
                dataIndex: 'status',
                rowKey: 'status',
                width: '150px',
                render: (text, record) => (
                    <span className="text-right">{record?.status || ''}</span>
                ),
            },
        ];
        return (
            <Table
                columns={tableColumn}
                dataSource={tableData}
                rowKey={(record) => record._id}
            />
        );
    }
}

export default TableInvoices;
