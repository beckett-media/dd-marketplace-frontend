import React from 'react';
import { baseUrl } from "~/repositories/Repository";
import Link from 'next/link';

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
                            <a>{source.title}</a>
                        </Link>
                    </h4>

                    <div className="ps-block__rating mb-4">
                    </div>
                    <p>{source.desc}</p>
                    {source.phone && (
                        <p>
                            <i className="icon-telephone"></i> {source.phone}
                        </p>
                    )}
                </figure>
            </div>
            <div className="ps-block__author mt-4">
                <a className="ps-block__user" href={`/store/${source.id}`}
                    style={{
                        backgroundImage: `url('${`${source.images.length > 0 ? `${baseUrl}/${source.images[0]}` : "/static/img/vendor/store/vendor-150x150.jpg"}`}')`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "50% 50%",
                    }}
                >
                    {/* <img
                        src="/static/img/vendor/store/vendor-150x150.jpg"
                        alt="Due Dilly"
                    /> */}
                </a>
                <Link href="/store/[slug]" as={`/store/${source._id}`}>
                    <a className="ps-btn">Visit Store</a>
                </Link>
            </div>
        </article>
    );
};

export default StoreDefault;
