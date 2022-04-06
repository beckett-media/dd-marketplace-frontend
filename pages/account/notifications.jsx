import React from 'react';
import ContainerPage from '~/components/layouts/ContainerPage';
import Notifications from '~/components/partials/account/Notifications';

const AccountNotificationsPage = () => {
    
    return (
        <ContainerPage title="Notifications" boxed={true}>
            <div className="ps-page--my-account">
                <Notifications />
            </div>
        </ContainerPage>
    );
};

export default AccountNotificationsPage;
