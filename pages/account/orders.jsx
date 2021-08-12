import React from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';
import Invoices from '~/components/partials/account/Invoices';
import ContainerPage from '~/components/layouts/ContainerPage';

const InvoicePage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Orders',
        },
    ];
    return (
        <ContainerPage title="Orders" boxed={true}>
            <div className="profile-cover-image"></div>
            <div className="ps-page--my-account">
                <Invoices />
            </div>
        </ContainerPage>
    );
};

export default InvoicePage;
