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
                    <p>
                        Sold By Store:
                        <strong> {product.storeDetails.title}</strong>
                    </p>
                    <p>
                        Store Owner:
                        <strong> {product.seller.fullName}</strong>
                    </p>
                </span>
            ) : (
                <span>
                    <p>
                        Sold By:
                        <strong> {product.seller.fullName}</strong>
                    </p>
                </span>
            )}

            <ul className="ps-list--dot">
                <p>
                    Condition: <b>{product.condition}</b>
                </p>
                <p>
                    Grade: <b>{grade?.name}</b>
                </p>

                <p>{product.description}</p>
            </ul>
            <div
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
            </div>
            {product.card && (
                <div className="fac-report-url">
                    <span>
                        <FileProtectOutlined
                            style={{ marginRight: 10, fontSize: 20 }}
                        />
                        <a
                            target="_blank"
                            href={cardFACURL + '/' + product.card._id}>
                            View SNAPSCORE&trade  Report
                        </a>
                    </span>
                </div>
            )}
        </div>
    );
};

export default ModuleProductDetailDescription;
