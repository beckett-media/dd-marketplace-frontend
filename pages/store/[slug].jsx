import React from 'react';
import ContainerPage from '~/components/layouts/ContainerPage';
import BreadCrumb from '~/components/elements/BreadCrumb';
import StoreDetail from '~/components/partials/stores/StoreDetail';
import { useRouter } from 'next/router';

const StoreDetailPage = () => {
    const Router = useRouter();
    const { slug } = Router.query;
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Store list',
            url: '/stores',
        },
        {
            text: 'Store Detail',
        },
    ];

    return (
        <ContainerPage title="Store" boxed={true}>
            <BreadCrumb breacrumb={breadCrumb} />
            <StoreDetail slug={slug} />
        </ContainerPage>
    );
};

export default StoreDetailPage;
