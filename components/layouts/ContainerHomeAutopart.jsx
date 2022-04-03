import Head from 'next/head';
import React from 'react';
import SiteFeatures from '~/components/partials/homepage/autopart/SiteFeatures';
import FooterSecond from '~/components/shared/footers/FooterSecond';
import HeaderAutoPart from '~/components/shared/headers/HeaderAutoPart';
import HeaderMobileAutopart from '~/components/shared/headers/HeaderMobileAutopart';

const ContainerHomeAutopart = ({ children, title = 'Home Autopart' }) => {
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
            <HeaderAutoPart />
            <HeaderMobileAutopart />
            {/* <NavigationList /> */}
            <main id="homepage-2">
                {children}
                <SiteFeatures />
                <FooterSecond classes="autopart" />
            </main>
            {/*<SwicherDemo />
            <SubscribePopup active={subscribe} />*/}
        </div>
    );
};

export default ContainerHomeAutopart;
