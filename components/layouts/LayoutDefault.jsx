import Head from 'next/head';
import React from 'react';
import HeaderDefault from '~/components/shared/headers/HeaderDefault';
import NavigationList from '~/components/shared/navigation/NavigationList';

const LayoutDefault = ({ children, title }) => {
    let titleView;
    if (title !== undefined) {
        titleView = process.env.title + ' | ' + title;
    } else {
        titleView = process.env.title + ' | ' + process.env.titleDescription;
    }

    return (
        <div className="martfury">
            <Head>
                <title>{titleView}</title>
            </Head>
            <HeaderDefault />
            <NavigationList />
            {children}
            {/* <Newsletters layout="container" /> */}
            {/* <FooterDefault /> */}
        </div>
    );
};

export default LayoutDefault;
