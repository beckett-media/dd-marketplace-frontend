import React from 'react';
import ContainerPage from '~/components/layouts/ContainerPage';
import UserInformation from '~/components/partials/account/UserInformation';
import AuthHoc from '~/repositories/AuthHoc';

const UserInformationPage = () => {
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
