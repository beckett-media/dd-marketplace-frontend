import React from 'react';
import { baseUrl } from '~/repositories/Repository';
import Link from 'next/link';
import { Avatar } from 'antd';
import { capitalizeFirstEach, capitalizeFirstLetter } from '~/utilities/string';

const StoreDefault = ({ source }) => {
    return (
        <article className="ps-block--store-2">
            <div
                className="ps-block__content bg--cover"
                style={{
                    background: `url('/static/img/vendor/store/default-store-banner.png')`,
                }}>
                <figure>
                    <h4>
                        <Link href="/store/[slug]" as={`/store/${source._id}`}>
                            <a>{capitalizeFirstEach(source.title)}</a>
                        </Link>
                    </h4>

                    <div className="ps-block__rating mb-4"></div>
                    <p
                        style={{
                            color: '#000',
                        }}>
                        {capitalizeFirstLetter(source.desc)}
                    </p>
                    {source.phone && (
                        <p>
                            <i className="icon-telephone"></i> {source.phone}
                        </p>
                    )}
                </figure>
            </div>
            <div className="ps-block__author mt-4">
                <a
                    className="ps-block__user"
                    href={`/store/${source._id}`}
                    // style={{
                    //     backgroundImage: `url('${`${
                    //         source.images.length > 0
                    //             ? `${baseUrl}/${source.images[0]}`
                    //             : '/static/img/vendor/store/vendor-150x150.jpg'
                    //     }`}')`,
                    //     backgroundRepeat: 'no-repeat',
                    //     backgroundPosition: '50% 50%',
                    // }}
                >
                    <Avatar
                        size="large"
                        src={
                            source.images.length > 0
                                ? `${baseUrl}/${source.images[0]}`
                                : '/static/img/vendor/store/vendor-150x150.jpg'
                        }
                        style={{
                            width: '62px',
                            height: '62px',
                        }}
                        alt="store image"></Avatar>
                </a>
                <Link href="/store/[slug]" as={`/store/${source._id}`}>
                    <a className="ps-btn">Visit Store</a>
                </Link>
            </div>
        </article>
    );
};

export default StoreDefault;
