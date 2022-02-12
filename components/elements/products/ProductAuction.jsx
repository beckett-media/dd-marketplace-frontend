import React from 'react';
import Link from 'next/link';
import {
    StrapiProductPrice,
    StrapiProductThumbnail,
} from '~/utilities/product-helper';
import { useSelector } from 'react-redux';

const ProductAuctionHorizontal = ({ auction }) => {
    let grade = useSelector(({ home }) =>
        home?.marketPlace?.grades?.find(
            (grade) => grade._id === auction.listing.grade
        )
    );
    let packaging = useSelector(({ home }) =>
        home?.marketPlace?.products?.find(
            (p) => p._id === auction.listing.product
        )
    );

    return (
        <Link
            href={'/auction-product/[pid]'}
            as={`/auction-product/${
                auction._id
            }`}>
            <div className="ps-product--horizontal">
                <div className="ps-product__thumbnail">
                    {StrapiProductThumbnail(
                        auction.listing,
                        false,
                        auction._id
                    )}
                </div>
                <div>timeLeft: {auction.bidEnd}</div>
                <div>totalBids: {auction.bids.length}</div>
                <div className="ps-product__content">
                    <>
                        <span>{auction.listing.title}</span>
                        <p className={'my-3 ps-product__player'}>
                            {auction.listing.playerNames.join(',')}
                        </p>
                    </>
                    <div
                        className="ps-product__meta-wrapper"
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}>
                        <div className="ps-product__meta">
                            <div>
                                <span>Packaging</span>
                                <p>
                                    <strong className="text-secondary">
                                        {packaging?.name}
                                    </strong>
                                </p>
                            </div>
                            <div>
                                <span>Grade</span>
                                <p>
                                    <strong className="text-secondary">
                                        {grade?.name}
                                    </strong>
                                </p>
                            </div>
                        </div>
                        <div>{StrapiProductPrice(auction.listing)}</div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductAuctionHorizontal;
