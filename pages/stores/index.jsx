import React from 'react';
import ContainerPage from '~/components/layouts/ContainerPage';
import StoreItems from '~/components/partials/stores/StoreItems';

const StoreListPage = () => {
    return (
        <ContainerPage title="Store list" boxed={true}>
            <div
                className="ps-page--single ps-page--vendor"
                style={{ backgroundColor: '#121634', height: '100vh' }}>
                <section className="ps-store-list">
                    <div className="container">
                        <div className="ps-section__header">
                            <h3>Store list</h3>
                        </div>
                        <div className="ps-section__content">
                            <StoreItems />
                        </div>
                    </div>
                </section>
            </div>
        </ContainerPage>
    );
};

export default StoreListPage;
