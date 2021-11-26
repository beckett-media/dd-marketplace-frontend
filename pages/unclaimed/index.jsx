import React from 'react';
import ModuleUnStoreButtonClaim from '~/components/elements/detail/modules/ModuleUnStoreButtonClaim';

import ContainerPage from '~/components/layouts/ContainerPage';
import UnStoreDetail from '~/components/partials/stores/UnStoreDetail';
const UnclaimedDefaultPage = () => {
    return (
        <ContainerPage title="Store" boxed={true}>
            <UnStoreDetail boxed={true} />
        </ContainerPage>
    );
};

export default UnclaimedDefaultPage;
