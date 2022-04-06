import Head from 'next/head';
import React from 'react';
import SiteFeatures from '~/components/partials/homepage/autopart/SiteFeatures';
import HeaderElectronic from '~/components/shared/headers/HeaderElectronic';
import HeaderMobileElectronic from '~/components/shared/headers/HeaderMobileElectronic';

const ContainerHomeElectronics = ({ children, title = 'Home Electronics' }) => {
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
            <HeaderElectronic />
            <HeaderMobileElectronic />
            {/* <NavigationList /> */}
            {/* <SubscribePopup active={subscribe} />*/}
            <main id="homepage-7">
                {children}
                <SiteFeatures />
            </main>
            {/* <FooterDefault /> */}
        </div>
    );
};

export default ContainerHomeElectronics;
