import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { notification } from 'antd';
import ContainerProductDetail from '~/components/layouts/ContainerProductDetail';
import AuctionProductRepository from '~/repositories/AuctionProductRepository';
import SkeletonProductDetail from '~/components/elements/skeletons/SkeletonProductDetail';
import ProductDetailFullwidth from '~/components/elements/detail/ProductDetailFullwidth';
import HeaderProduct from '~/components/shared/headers/HeaderProduct';
import HeaderDefault from '~/components/shared/headers/HeaderDefault';
import { appName, baseUrl } from '~/repositories/Repository';
import io from 'socket.io-client';
import { LeftOutlined } from '@ant-design/icons';

const AuctionProductDefaultPage = () => {
    const router = useRouter();
    const userId = useSelector((store) => store.auth.user?.id);
    const { pid } = router.query;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const socketIo = io(baseUrl);
    async function getProduct(pid) {
        setLoading(true);
        const responseData =
            await AuctionProductRepository.getAuctionProductsById(pid);
        const payload = responseData?.data?.auction;

        if (payload) {
            setProduct({
                ...payload.listing,
                seller: payload.seller,
                auctionDetails: { ...payload, listing: null },
            });
        }
    }

    useEffect(() => {
        if (pid)
            socketIo.emit('join auction room', {
                room: pid,
            });

        return () => {
            if (pid)
                socketIo.emit('leave auction room', {
                    room: pid,
                });
        };
    }, [product]);

    useEffect(() => {
        setLoading(false);
    }, [product]);

    useEffect(() => {
        if (pid) getProduct(pid);
    }, [pid]);

    useEffect(() => {
        socketIo.emit('join auction room', { room: pid });

        socketIo.on('new bid', (payload) => {
            console.log(payload);
        });

        return () => {
            socketIo.emit('leave auction room', {
                room: pid,
            });
            socketIo.off('new bid');
        };
    }, []);

    const placeBid = ({ bidAmount }) => {
        if (bidAmount < product.auctionDetails.bids?.[0]?.bidAmount) {
            return notification.info({
                message: 'Info',
                description: 'You bid must be heigher than current bid.',
            });
        }
        let newBid = {
            bidAmount: bidAmount,
            jwt: localStorage.getItem(`${appName}_xAuthToken`),
        };
        socketIo.emit('new bid', {
            room: pid,
            bidInfo: newBid,
        });
    };

    socketIo.on('new bid', (response) => {
        if (response.data.bidder === userId) {
            if (response.success) {
                setProduct({
                    ...product,
                    auctionDetails: { ...response.data._doc, listing: null },
                });
                notification.success({
                    message: 'Success',
                    description: response.message,
                });
            } else {
                notification.error({
                    message: 'Error',
                    description: response.message,
                });
            }
        } else {
            if (response.success) {
                setProduct({
                    ...product,
                    auctionDetails: { ...response.data._doc, listing: null },
                });
                notification.info({
                    message: 'New Bid',
                    description: 'Some one placed a new bid',
                });
            }
        }
    });

    // Views
    let productView, headerView;
    if (!loading) {
        if (product) {
            productView = (
                <ProductDetailFullwidth
                    product={product}
                    placeBid={placeBid}
                    bidding={true}
                />
            );
            headerView = <HeaderProduct product={product} />;
        } else {
            headerView = <HeaderDefault />;
        }
    } else {
        productView = <SkeletonProductDetail />;
    }
    return (
        <ContainerProductDetail title={product ? product.title : 'Loading...'}>
            {headerView}
            {/* <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" /> */}

            <div className="ps-page--product">
                <div className="ps-container">
                    <div
                        className={'ps-page__back'}
                        onClick={() => {
                            router.back();
                        }}>
                        <LeftOutlined />
                        <p style={{ color: '#fff', fontSize: '20px' }}>
                            Back to MarketPlace
                        </p>
                    </div>
                    <div className="ps-page__container">
                        <div className="ps-page__left">{productView}</div>
                    </div>
                </div>
            </div>
        </ContainerProductDetail>
    );
};

export default AuctionProductDefaultPage;
