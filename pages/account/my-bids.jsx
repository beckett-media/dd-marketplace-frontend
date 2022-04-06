import React, { useEffect, useState } from 'react';
import ContainerPage from '~/components/layouts/ContainerPage';
import AuctionInformation from '~/components/partials/account/AuctionInformation';
import AuctionProductRepository from '~/repositories/AuctionProductRepository';
import AuthHoc from '~/repositories/AuthHoc';

const AuctionInformationPage = () => {
    const [biddedAuctions, setBiddedAuctions] = useState();

    async function fetchUserBidsAuction() {
        try {
            const auctionsResp =
                await AuctionProductRepository.getUserBidsAuction();
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
