/*
 * React template helpers
 * Author: Nouthemes
 * Developed: diaryforlife
 * */

import React from 'react';
import LazyLoad from 'react-lazyload';
import {
    baseUrl,
    s3baseURL,
    s3baseURLThumbnail,
} from '~/repositories/Repository';
import Link from 'next/link';

export function formatCurrency(num) {
    if (num !== undefined) {
        return parseFloat(num)
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    } else {
    }
}

export function getColletionBySlug(collections, slug) {
    if (collections.length > 0) {
        const result = collections.find(
            (item) => item.slug === slug.toString()
        );
        if (result !== undefined) {
            return result.products;
        } else {
            return [];
        }
    } else {
        return [];
    }
}

export function getItemBySlug(banners, slug) {
    if (banners.length > 0) {
        const banner = banners.find((item) => item.slug === slug.toString());
        if (banner !== undefined) {
            return banner;
        } else {
            return null;
        }
    } else {
        return null;
    }
}

export function convertSlugsQueryString(payload) {
    let query = '';
    if (payload.length > 0) {
        payload.forEach((item) => {
            if (query === '') {
                query = `slug_in=${item}`;
            } else {
                query = query + `&slug_in=${item}`;
            }
        });
    }
    return query;
}

export function StrapiProductBadge(product) {
    let view;
    if (product.badge && product.badge !== null) {
        view = product.badge.map((badge) => {
            if (badge.type === 'sale') {
                return <div className="ps-product__badge">{badge.value}</div>;
            } else if (badge.type === 'outStock') {
                return (
                    <div className="ps-product__badge out-stock">
                        {badge.value}
                    </div>
                );
            } else {
                return (
                    <div className="ps-product__badge hot">{badge.value}</div>
                );
            }
        });
    }
    return view;
}

export function StrapiProductPrice(product) {
    let view;
    if (product.is_sale === true) {
        view = (
            <p className="ps-product__price sale">
                ${formatCurrency(product.price)}
                <del className="ml-2">
                    ${formatCurrency(product.sale_price)}
                </del>
            </p>
        );
    } else {
        view = (
            <p className="ps-product__price">
                ${formatCurrency(product.price)}
            </p>
        );
    }
    return view;
}

export function StrapiProductPriceExpanded(product) {
    let view;
    if (product.is_sale === true) {
        view = (
            <p className="ps-product__price sale">
                ${formatCurrency(product.price)}
                <del className="ml-2">
                    ${formatCurrency(product.sale_price)}
                </del>
                <small>18% off</small>
            </p>
        );
    } else {
        view = (
            <p className="ps-product__price">
                ${formatCurrency(product.price)}
            </p>
        );
    }
    return view;
}

export function StrapiProductThumbnail(product, unClaimed, auctionId) {
    let view;

    if (product.card) {
        return (
            <Link
                href={auctionId ? '/auction-product/[pid]' : '/product/[pid]'}
                as={`${
                    auctionId
                        ? `/auction-product/${auctionId}`
                        : `/product/${product._id}`
                }`}>
                <a>
                    <LazyLoad>
                        <img
                            src={s3baseURLThumbnail + product.card.front}
                            alt={product.title}
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src = `${s3baseURL}/${product.card.front}`;
                            }}
                        />
                    </LazyLoad>
                </a>
            </Link>
        );
    }

    let productImages = product?.images;
    let cardFront, cardFrontThumbnail;
    if (productImages?.length > 0) {
        if (productImages[0].startsWith('card')) {
            if (productImages[0].startsWith('cardFront')) {
                cardFront = `${s3baseURL}/${productImages[0]}`;
                cardFrontThumbnail = `${s3baseURLThumbnail}${productImages[0]}`;
            } else {
                cardFront = `${s3baseURL}/${productImages[1]}`;
                cardFrontThumbnail = `${s3baseURLThumbnail}${productImages[1]}`;
            }
        } else {
            cardFront = `${baseUrl}/${productImages[0]}`;
            cardFrontThumbnail = `${s3baseURLThumbnail}${productImages[0]}`;
        }
    }

    if ((product && product.thumbnail) || cardFront) {
        if (!unClaimed) {
            view = (
                <Link
                    href={
                        auctionId ? '/auction-product/[pid]' : '/product/[pid]'
                    }
                    as={`${
                        auctionId
                            ? `/auction-product/${auctionId}`
                            : `/product/${product._id}`
                    }`}>
                    <a>
                        <LazyLoad>
                            <img
                                src={cardFrontThumbnail}
                                alt={product.title}
                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src = cardFront;
                                }}
                            />
                        </LazyLoad>
                    </a>
                </Link>
            );
        } else {
            view = (
                <LazyLoad>
                    <img src={product.images[0]} alt={product.title} />
                </LazyLoad>
            );
        }
    } else {
        view = (
            <Link href={`/product/${product?._id}`}>
                <a>
                    {/* <LazyLoad>
                        <img src="/static/img/not-found.jpg" alt="martfury" />
                    </LazyLoad> */}
                </a>
            </Link>
        );
    }

    return view;
}
