import React from 'react';
import ModuleUnStoreButtonClaim from '~/components/elements/detail/modules/ModuleUnStoreButtonClaim';

const ModuleUnStoreDetailDescription = ({storeId}) => {
    return (
        <div className="ps-product__desc">
            <div className="ps-product__desc" />
            <h2>Steps for claiming this store</h2>
            <div className="ps-product__desc" />
            <ul className="ps-list--dot">
                <p>
                    Step 1:
                    <b>Click on "Claim this store" button showing below</b>
                </p>
                <p>
                    Step 2:
                    <b>
                        Register an account on that page and this store will be
                        yours
                    </b>
                </p>
            </ul>
            <ModuleUnStoreButtonClaim storeId={storeId} />
        </div>
    );
};

export default ModuleUnStoreDetailDescription;
