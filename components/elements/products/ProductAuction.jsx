import React from 'react';
import Link from 'next/link';
import moment from 'moment';
import {
    StrapiProductPrice,
    StrapiProductThumbnail,
} from '~/utilities/product-helper';
import { useSelector } from 'react-redux';
import Countdown from '~/components/countDown.jsx';

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
   
  const endDate=(moment(auction.bidEnd).format("MM DD YYYY, h:mm a"));
    return (
        <Link
            href={'/auction-product/[pid]'}
            as={`/auction-product/${auction._id}`}>
            <div className="ps-product--horizontal">
                <div className="ps-product__thumbnail">
                    {StrapiProductThumbnail(
                        auction.listing,
                        false,
                        auction._id
                    )}
                </div>
               
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
                <div  style={{display:"flex" , alignItems: "center",color: '#7A8088'}}>  <span
                                style={{
                                    color: '#7A8088',
                                    fontSize: '32px',
                                    marginRight: '8px',
                                }}>
                                {`${
                                    auction.bids[0]?.bidAmount ||
                                    auction.startingBid
                                }$`}
                            </span> {auction.bids.length} Bids</div>

                <hr/>
               
                <div style={{display:"flex" ,color: '#7A8088',margin:"5px"}}>TIME LEFT: <Countdown
                    timeTillDate={endDate}
                    timeFormat="MM DD YYYY, h:mm a"
                /></div>
            </div>
        </Link>
    );
};

export default ProductAuctionHorizontal;
