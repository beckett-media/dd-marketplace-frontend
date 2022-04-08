import { Form, Input, Modal } from 'antd';
import React, { useState } from 'react';
import Countdown from 'react-countdown';
import { baseUrl } from '~/repositories/Repository';
import { getDifferenceInDays } from '~/utilities/time';

const BiddingModal = ({ open, setOpen, auctionDetails, placeBid, product }) => {
    const [visible, setVisible] = useState(false);
    const confirmLoading = false;
    const { bidEnd, bidStart } = product?.auctionDetails || {};
    const ref = React.createRef();

    const handleCancel = () => {
        setOpen(false);
        setVisible(false);
    };

    const Timer = ({ days, hrs, mins, sec }) => {
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 10,
                }}>
                <p style={{ color: 'orange' }}>{days}D</p>
                <p style={{ color: 'orange' }}>{hrs}M</p>
                <p style={{ color: 'orange' }}>{mins}M</p>
                <p style={{ color: 'orange' }}>{sec}S</p>
            </div>
        );
    };

    const bidEndingRenderer = ({ hours, minutes, seconds, completed }) => {
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

    return (
        <div>
            <Modal
                visible={open ? open : visible}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={null}
                width={500}
                closable={false}
                bodyStyle={{ height: 600, backgroundColor: 'transparent' }}>
                <div className="ps-my-account">
                    <div>
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

                                                <Countdown
                                                    date={bidEnd}
                                                    renderer={bidEndingRenderer}
                                                    onComplete={() => {
                                                        setShowBtn(false);
                                                    }}
                                                />
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
