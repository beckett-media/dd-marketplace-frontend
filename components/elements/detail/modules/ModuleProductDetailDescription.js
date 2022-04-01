import React from 'react';
import Link from 'next/link';
import { Button } from 'antd';
import { cardFACURL } from '~/repositories/Repository';
import { FileProtectOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const ModuleProductDetailDescription = ({ product }) => {
    const gradeData = [
        { key: 'cardType', title: 'Type' },
        { key: 'modelNo', title: 'Set Name' },
        { key: 'brand', title: 'Brand' },
        { key: 'year', title: 'Year' },
        { key: 'serialNumber', title: 'Serial Number' },
    ];

    const grade = useSelector(({ home }) =>
        home?.marketPlace?.grades?.find(({ _id }) => product.grade === _id)
    );

    return (
        <div className="ps-product__desc">
            {product?.storeDetails?.title ? (
                <span>
                    <p style={{ color: '#fff' }}>
                        Sold By Store:
                        <strong> {product.storeDetails.title}</strong>
                    </p>
                    <p style={{ color: '#fff' }}>
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
                    <h6 style={{ color: '#BCBEC5' }}>Sold By </h6>
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
                <h6 style={{ color: '#BCBEC5' }}>Condition </h6>
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
                <h6 style={{ color: '#BCBEC5' }}>Grade </h6>
                <p style={{ color: '#fff', marginTop: -4 }}>
                    <strong> {grade?.name}</strong>
                </p>
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                <h6 style={{ color: '#BCBEC5' }}>Features </h6>
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
