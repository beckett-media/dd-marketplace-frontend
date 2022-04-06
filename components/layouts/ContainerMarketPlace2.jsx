import Head from 'next/head';
import React from 'react';
import HeaderMarketPlace2 from '~/components/shared/headers/HeaderMarketPlace2';
import HeaderMobile from '~/components/shared/headers/HeaderMobile';

const ContainerMarketPlace2 = ({ children, title }) => {
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
            <HeaderMarketPlace2 />
            <HeaderMobile />
            {/* <NavigationList /> */}
            <main id="homepage-4">{children}</main>
            {/* <FooterMarketPlace2 /> */}
        </div>
    );
};

export default ContainerMarketPlace2;
