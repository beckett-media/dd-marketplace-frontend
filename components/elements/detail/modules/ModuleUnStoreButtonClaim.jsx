import React from 'react';

const ModuleUnStoreButtonClaim = ({ storeId }) => {
    return (
        <div className="ps-product__shopping extend">
            <div className="ps-product__btn-group">
                <a
                    className="ps-btn ps-btn--black"
                    href={`https://seller.duedilly.co/account/register?claim=${storeId}`}>
                    Claim this Store
                </a>
            </div>
        </div>
    );
};

export default ModuleUnStoreButtonClaim;
