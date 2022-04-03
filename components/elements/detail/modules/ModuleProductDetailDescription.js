import { FileProtectOutlined } from '@ant-design/icons';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import { useSelector } from 'react-redux';
import { cardFACURL } from '~/repositories/Repository';
import { isBidStarted } from '~/utilities/time';

const ModuleProductDetailDescription = ({ product }) => {
    const [bidActive, setBidActive] = useState(false);

    const { bidEnd, bidStart } = product?.auctionDetails || {};

    useEffect(() => {
        if (isBidStarted(bidStart, bidEnd)) {
            setBidActive(true);
        } else {
            setBidActive(false);
        }
    }, []);

    const grade = useSelector(({ home }) =>
        home?.marketPlace?.grades?.find(({ _id }) => product.grade === _id)
    );

    const beforeStartRenderer = () => {
        return (
            <div
                className="auction-status"
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 20,
                }}>
                <h6 style={{ fontWeight: 'lighter', color: '#BCBEC5' }}>
                    Auction Pending
                </h6>
                <p style={{ marginTop: -4 }}>
                    {moment(bidStart).format('MM/DD/YYYY')}
                    {' AT '}
                    {moment(bidStart).format('hh:mm a')}{' '}
                </p>
            </div>
        );
    };

    const bidEndingRenderer = ({ completed }) => {
        if (completed) {
            return (
                <div
                    className="auction-status"
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 20,
                        marginBottom: 5,
                    }}>
                    <h6 style={{ fontWeight: 'lighter', color: '#BCBEC5' }}>
                        Auction Closed
                    </h6>
                </div>
            );
        }
        return (
            <div
                className="auction-status"
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 20,
                    width: '100%',
                }}>
                <h6 style={{ fontWeight: 'lighter', color: '#BCBEC5' }}>
                    Auction Started
                </h6>
                <p style={{ marginTop: -4 }}>
                    {moment(bidStart).format('MM/DD/YYYY')}
                    {'  AT  '}
                    {moment(bidStart).format('hh:mm a')}{' '}
                </p>
            </div>
        );
    };

    return (
        <div className="ps-product__desc">
            {bidActive && (
                <Countdown
                    date={bidEnd}
                    renderer={bidEndingRenderer}
                    onComplete={() => {}}
                />
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
            {product?.storeDetails?.title ? (
                <span>
                    <p style={{ color: '#fff', fontWeight: 'lighter' }}>
                        Sold By Store:
                        <strong> {product.storeDetails.title}</strong>
                    </p>
                    <p style={{ color: '#fff', fontWeight: 'lighter' }}>
                        Store Owner:
                        <strong> {product.seller.fullName}</strong>
                    </p>
                </span>
            ) : (
                <div
                    style={{
                        display: 'flex',
                        gap: 20,
                        flexDirection: 'row',
                    }}>
                    <h6 style={{ color: '#BCBEC5', fontWeight: 'lighter' }}>
                        Sold By{' '}
                    </h6>
                    <p style={{ color: '#fff', marginTop: -4 }}>
                        <strong> {product.seller.fullName}</strong>
                    </p>
                </div>
            )}

            <div
                style={{
                    display: 'flex',
                    gap: 20,
                    flexDirection: 'row',
                }}>
                <h6 style={{ color: '#BCBEC5', fontWeight: 'lighter' }}>
                    Condition{' '}
                </h6>
                <p style={{ color: '#fff', marginTop: -4 }}>
                    <strong> {product.condition}</strong>
                </p>
            </div>

            <div
                style={{
                    display: 'flex',
                    gap: 20,
                    flexDirection: 'row',
                }}>
                <h6 style={{ color: '#BCBEC5', fontWeight: 'lighter' }}>
                    Grade{' '}
                </h6>
                <p style={{ color: '#fff', marginTop: -4 }}>
                    <strong> {grade?.name}</strong>
                </p>
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                <h6 style={{ color: '#BCBEC5', fontWeight: 'lighter' }}>
                    Features{' '}
                </h6>
                <p style={{ color: '#fff' }}>
                    <strong> {product.description}</strong>
                </p>
            </div>

            {/* <div
                className="ps-product__grading"
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                }}>
                {gradeData.map(({ key, title }) => (
                    <>
                        {product[key] ? (
                            <div className="my-3">
                                <p
                                    className="m-0 mr-5"
                                    style={{ fontWeight: 'bold' }}>
                                    {title}
                                </p>
                                {product[key]}
                            </div>
                        ) : (
                            <></>
                        )}
                    </>
                ))}
            </div> */}
            {product.card && (
                <div className="fac-report-url">
                    <span>
                        <FileProtectOutlined
                            style={{ marginRight: 10, fontSize: 20 }}
                        />
                        <a
                            target="_blank"
                            href={cardFACURL + '/' + product.card._id}>
                            View SNAPSCORE&trade; Report
                        </a>
                    </span>
                </div>
            )}
        </div>
    );
};

export default ModuleProductDetailDescription;
