import Head from 'next/head';
import React from 'react';
import HeaderFurniture from '~/components/shared/headers/HeaderFurniture';
import HeaderMobileFurniture from '~/components/shared/headers/HeaderMobileFurniture';

const ContainerHomeFurniture = ({ children, title = 'Home Furniture' }) => {
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
            <HeaderFurniture />
            <HeaderMobileFurniture />
            {/* <NavigationList /> */}
            <main id="homepage-8">{children}</main>
            {/* <FooterSecond classes="ps-footer--furniture" /> */}
        </div>
    );
};

export default ContainerHomeFurniture;
