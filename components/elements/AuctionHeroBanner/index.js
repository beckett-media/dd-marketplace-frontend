import * as React from 'react';
import { baseUrl, s3baseURL } from '~/repositories/Repository';
import Roter from 'next/router';
import { Button } from 'antd';

const AuctionBanner = ({ _id, productImage }) => (
    <div id="mobile" className="inst-asst-container py-5 position-relative">
        <div className="container-md">
            <div className="row g-0 d-flex align-items-center">
                <div className="col-12 col-md-6 inst-asst-img-container">
                    <div className="item">
                        <img
                            src={
                                (productImage?.startsWith('card')
                                    ? s3baseURL
                                    : baseUrl) +
                                '/' +
                                productImage
                            }
                            width="250px"
                            alt={baseUrl + productImage}
                        />
                    </div>
                </div>
                <div className="col-12 col-md-6 inst-asst-text-container position-relative">
                    <div className="position-relative d-inline-block">
                        <h2 className="pti-font text-white">
                            BE A PART OF DUE DILLY AUCTIONS
                        </h2>
                    </div>
                    <div className="d-flex pb-5 pb-sm-0">
                        <Button
                            className="ps-btn ps-btn--black"
                            onClick={() => {
                                Roter.push(`/auction-product/${_id}`);
                            }}>
                            PLACE YOUR BID
                        </Button>
                    </div>
                </div>
            </div>
        </div>
        <img
            src="/static/img/globe-bg.png"
            quality={50}
            width="auto"
            height="auto"
            formats={['AUTO', 'WEBP', 'AVIF']}
            style={{
                width: 100,
                height: 100,
                position: 'absolute',
                right: -50,
                bottom: '5rem',
                opacity: 0.2,
            }}
        />
    </div>
);

export default AuctionBanner;
