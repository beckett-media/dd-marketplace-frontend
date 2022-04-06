import Head from 'next/head';
import React from 'react';
import HeaderMarketPlace3 from '~/components/shared/headers/HeaderMarketPlace3';
import HeaderMobile from '~/components/shared/headers/HeaderMobile';

const ContainerMarketPlace3 = ({ children, title }) => {
    let titleView;
    if (title !== null) {
        titleView = process.env.title + ' | ' + title;
    } else {
        titleView = process.env.title + ' | ' + process.env.titleDescription;
    }

    return (
        <div className="martfury">
            <Head>
                <title>{titleView}</title>
            </Head>
            <HeaderMarketPlace3 />
            <HeaderMobile />
            {/* <NavigationList /> */}
            <main id="homepage-5">
                <div className="container">{children}</div>
            </main>
            {/* <FooterMarketPlace2 /> */}
        </div>
    );
};

export default ContainerMarketPlace3;
