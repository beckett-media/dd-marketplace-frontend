import Head from 'next/head';
import React from 'react';
import HeaderDefault from '~/components/shared/headers/HeaderDefault';
import HeaderMobile from '~/components/shared/headers/HeaderMobile';

const ContainerPage = ({
    children,
    title,
    boxed = false,
    noHeader = false,
}) => {
    let titleView;
    if (title !== null) {
        titleView = process.env.title + ' | ' + title;
    } else {
        titleView = process.env.title + ' | ' + process.env.titleDescription;
    }

    if (boxed && !noHeader) {
        return (
            <div className="martfury">
                <Head>
                    <title>{titleView}</title>
                </Head>
                <HeaderDefault />
                <HeaderMobile />
                <main>{children}</main>
                {/* <Newletters layout="container" />
                <FooterDefault />
                <NavigationList /> */}
            </div>
        );
    } else if (!boxed && !noHeader) {
        return (
            <div className="martfury">
                <Head>
                    <title>{titleView}</title>
                </Head>
                <HeaderDefault />
                <HeaderMobile />
                <main>{children}</main>
                {/* <Newletters /> */}
                {/* <FooterFullwidth /> */}
                {/* <NavigationList /> */}
            </div>
        );
    } else if (noHeader) {
        return (
            <div className="martfury">
                <Head>
                    <title>{titleView}</title>
                </Head>
                <main>{children}</main>
                {/* <Newletters /> */}
                {/* <FooterFullwidth /> */}
                {/* <NavigationList /> */}
            </div>
        );
    } else {
        return (
            <div className="martfury">
                <Head>
                    <title>{titleView}</title>
                </Head>
                <HeaderDefault />
                <HeaderMobile />
                <main>{children}</main>
                {/* <Newletters /> */}
                {/* <FooterFullwidth /> */}
                {/* <NavigationList /> */}
            </div>
        );
    }
};

export default ContainerPage;
