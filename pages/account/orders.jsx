import React from 'react';
import ContainerPage from '~/components/layouts/ContainerPage';
import Invoices from '~/components/partials/account/Invoices';


const InvoicePage = () => {
    
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
