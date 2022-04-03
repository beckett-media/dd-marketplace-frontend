import { useRouter } from 'next/router';
import React from 'react';
import ContainerPage from '~/components/layouts/ContainerPage';
import StoreDetail from '~/components/partials/stores/StoreDetail';

const StoreDetailPage = () => {
    const Router = useRouter();
    const { slug } = Router.query;

    return (
        <ContainerPage title="Store" boxed={true}>
            <StoreDetail slug={slug} />
        </ContainerPage>
    );
};

export default StoreDetailPage;
