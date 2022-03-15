import React, { useEffect, useState } from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';
import AuctionInformation from '~/components/partials/account/AuctionInformation';
import ContainerPage from '~/components/layouts/ContainerPage';
import AuthHoc from '~/repositories/AuthHoc';
import AuctionProductRepository from '~/repositories/AuctionProductRepository';

const AuctionInformationPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'User Information',
        },
    ];

    const [biddedAuctions, setBiddedAuctions] = useState();

    async function fetchUserBidsAuction() {
        try {
            const auctionsResp = await AuctionProductRepository.getUserBidsAuction();
            setBiddedAuctions(auctionsResp.data.auctions);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchUserBidsAuction();
    }, []);

    return (
        <ContainerPage title="User Information" boxed={true}>
            <div className="profile-cover-image"></div>
            <div className="ps-page--my-account">
                <AuctionInformation biddedAuctions={biddedAuctions} />
            </div>
        </ContainerPage>
    );
};

export default AuthHoc(AuctionInformationPage);
