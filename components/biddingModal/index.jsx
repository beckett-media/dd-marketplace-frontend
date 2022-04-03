import React, { useState, Component } from 'react';

import { Modal } from 'antd';
import { Form, Input, notification, Row, Spin, Col } from 'antd';
import Title from '../elements/Title';
import { baseUrl } from '~/repositories/Repository';
import Image from 'next/image';

const BiddingModal = ({ open, setOpen, auctionDetails, placeBid, product }) => {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const ref = React.createRef();

    const handleCancel = () => {
        setOpen(false);
        setVisible(false);
    };

    return (
        <div>
            <Modal
                visible={open ? open : visible}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={null}
                width={500}
                closable={false}
                bodyStyle={{ height: 600, backgroundColor: '#43475F' }}>
                <div className="ps-my-account">
                    <div className="">
                        <Form
                            ref={ref}
                            className="ps-form--account"
                            onFinish={(values) => {
                                placeBid(values);
                                setOpen(false);
                            }}>
                            <div className="ps-tab active" id="sign-in">
                                <div
                                    className="ps-form__content"
                                    style={{
                                        height: 'auto',
                                    }}>
                                    <h2 style={{ color: '#fff' }}>PLACE BID</h2>
                                    {/* <a href="/">
                                        <img
                                            style={{ maxWidth: 120 }}
                                            src={'/static/img/logo-dark.png'}
                                            className="mb-5"
                                        />
                                    </a> */}
                                    {/* <Title
                                        title="Bidding Mela"
                                        subtitle={
                                            'Place Your Bid And Try Your LUCK!!'
                                        }
                                    /> */}
                                    <div
                                        style={{
                                            backgroundColor: '#121634',
                                            padding: '25px 40px',
                                        }}>
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: 15,
                                            }}>
                                            <div>
                                                <img
                                                    style={{
                                                        width: 85,
                                                        height: 120,
                                                    }}
                                                    src={`${baseUrl}/${product.images[0]}`}
                                                />
                                            </div>
                                            <div>
                                                <h6 style={{ color: '#fff' }}>
                                                    {product?.playerNames[0]}
                                                </h6>
                                                <p style={{ fontSize: 10 }}>
                                                    {product?.title}
                                                </p>
                                                <p
                                                    style={{
                                                        fontSize: 12,
                                                        color: 'orange',
                                                    }}>
                                                    {product?.brand}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ paddingTop: 5 }}>
                                        <p
                                            style={{
                                                color: '#fff',
                                                marginBottom: -2,
                                            }}>
                                            Bid Amount
                                        </p>
                                        <div className="form-group dark">
                                            <Form.Item
                                                name="bidAmount"
                                                extra={`$${
                                                    auctionDetails.bids[0]
                                                        ?.bidAmount ||
                                                    auctionDetails.startingBid
                                                } minimum`}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            'Please input bid amount!',
                                                    },
                                                ]}>
                                                <Input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="Bid Amount(Must Higher then last Highest Bid)"
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>

                                    <div style={{ marginTop: -10 }}>
                                        <p
                                            style={{
                                                color: '#fff',
                                                marginBottom: -2,
                                            }}>
                                            Email to notify if you have been
                                            outbid or win
                                        </p>
                                        <div className="form-group dark">
                                            <Form.Item
                                                name="email"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            'Please input email to notify you!',
                                                    },
                                                ]}>
                                                <Input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="Enter an email"
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>

                                    <div
                                        className="form-group submit"
                                        style={{ marginTop: -10 }}>
                                        <button
                                            type="submit"
                                            className="ps-btn ps-btn--fullwidth">
                                            Place Bid
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default BiddingModal;
