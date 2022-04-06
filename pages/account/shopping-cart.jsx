import React from 'react';
import ContainerPage from '~/components/layouts/ContainerPage';
import ShoppingCart from '~/components/partials/account/ShoppingCart';
import AuthHoc from '~/repositories/AuthHoc';

const ShoppingCartPage = () => {
    return (
        <ContainerPage title="Shopping Cart" boxed={true} hideScrollEvent>
            <div className="ps-page--simple">
                <ShoppingCart />
            </div>
        </ContainerPage>
    );
};

export default AuthHoc(ShoppingCartPage);
