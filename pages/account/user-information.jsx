import React from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';
import UserInformation from '~/components/partials/account/UserInformation';
import ContainerPage from '~/components/layouts/ContainerPage';
import AuthHoc from '~/repositories/AuthHoc';

const UserInformationPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'User Information',
        },
    ];

    return (
        <ContainerPage title="User Information" boxed={true}>
            <div className="profile-cover-image"></div>
            <div className="ps-page--my-account">
                <UserInformation />
            </div>
        </ContainerPage>
    );
};

export default AuthHoc(UserInformationPage);
