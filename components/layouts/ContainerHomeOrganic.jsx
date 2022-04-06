import Head from 'next/head';
import React from 'react';
import FooterSecond from '~/components/shared/footers/FooterSecond';
import HeaderMobileOrganic from '~/components/shared/headers/HeaderMobileOrganic';
import HeaderOrganic from '~/components/shared/headers/HeaderOrganic';


const ContainerHomeOrganic = ({ children, title = 'Home Organic' }) => {
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
            <HeaderOrganic />
            <HeaderMobileOrganic />
            {/* <NavigationList /> */}
            <main id="homepage-9">{children}</main>
            <FooterSecond classes="ps-footer--organic" />
        </div>
    );
};

export default ContainerHomeOrganic;
