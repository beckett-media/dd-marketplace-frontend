import React from 'react';
import Link from 'next/link';
import { baseUrl } from '~/repositories/Repository';

const BannerItem = ({ source }) => {
    if (source) {
        return (
            <Link href="/shop">
                <a>
                    <img
                        src={`${baseUrl}${source.image.url}`}
                        alt="Due Dilly"
                    />
                </a>
            </Link>
        );
    } else {
        return (
            <Link href="/shop">
                <a>
                    <a className="ps-collection">
                        <img src="/static/img/not-found.jpg" alt="Due Dilly" />
                    </a>
                </a>
            </Link>
        );
    }
};

export default BannerItem;
