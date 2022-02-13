import React, { useState, Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Modal, Button } from 'antd';
import { Form, Input, notification, Row, Spin, Col } from 'antd';
import Title from '../elements/Title';

const BiddingModal = ({ open, setOpen, auctionDetails, placeBid }) => {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const ref = React.createRef();

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
        setVisible(false);
    };

    return (
        <div>
            <Modal
                visible={open ? open : visible}
                // onOk={hanhandleOkdleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={null}
                width={500}
                closable={false}
                bodyStyle={{ height: 600 }}>
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
                                        height: '500px',
                                    }}>
                                    <a href="/">
                                        <img
                                            style={{ maxWidth: 120 }}
                                            src={'/static/img/logo-dark.png'}
                                            className="mb-5"
                                        />
                                    </a>
                                    <Title
                                        title="Bidding Mela"
                                        subtitle={
                                            'Place Your Bid And Try Your LUCK!!'
                                        }
                                    />
                                    <div style={{ paddingTop: 30 }}>
                                        <h4>
                                            Last Highest Bid: $
                                            {auctionDetails.bids[0]
                                                ?.bidAmount ||
                                                auctionDetails.startingBid}
                                        </h4>
                                        <div className="form-group dark">
                                            <Form.Item
                                                name="bidAmount"
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

                                    <div className="form-group submit">
                                        <button
                                            type="submit"
                                            className="ps-btn ps-btn--fullwidth">
                                            Place Bid.{' '}
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
