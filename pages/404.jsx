import Link from 'next/link';
import React from 'react';
import HeaderDefault from '../components/shared/headers/HeaderDefault';

function Error() {
    return (
        <div className="site-content">
            <HeaderDefault />
            <div className="ps-page--404">
                <div className="container">
                    <div className="ps-section__content">
                        <figure>
                            <img src="/static/img/404.jpg" alt="" />
                            <h3>Ohh! Page not found</h3>
                            <p>
                                It seems we can&apos;t find what you&apos;re
                                looking for. <br />
                                Go back to
                                <Link href="/">
                                    <a> Homepage</a>
                                </Link>
                            </p>
                        </figure>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Error;
