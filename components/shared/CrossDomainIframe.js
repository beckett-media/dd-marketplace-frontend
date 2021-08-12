import React from 'react';
import { sellerDashboardURL } from '~/repositories/Repository';

const CrossDomainIFrame = () => {
    return (
        <iframe height="0" src={sellerDashboardURL + '/cross-login'}></iframe>
    );
};

export default CrossDomainIFrame;
