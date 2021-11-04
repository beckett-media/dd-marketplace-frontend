import React from 'react';
import ThumbnailDefault from '~/components/elements/detail/thumbnail/ThumbnailDefault';
import ModuleUnStoreDetailDescription from '~/components/elements/detail/modules/ModuleUnStoreDetailDescription';
import ModuleUnStoreActions from '~/components/elements/detail/modules/ModuleUnStoreActions';
import ModuleUnStoreDetailActionsMobile from '~/components/elements/detail/modules/ModuleUnStoreDetailActionsMobile';
import ModuleStoreDetailTopInformation from '~/components/elements/detail/modules/ModuleStoreDetailTopInformation';

const UnStoreDetailFullwidth = ({ store }) => {
    return (
        <div className="ps-product--detail ps-product--fullwidth">
            <div className="ps-product__header">
                <div className="ps-product__info">
                    <ModuleStoreDetailTopInformation product={store} />
                    {!store.user && <ModuleUnStoreDetailDescription product={store} />}
                    <ModuleUnStoreActions product={store} />
                    <ModuleUnStoreDetailActionsMobile product={store} />
                </div>
                <ThumbnailDefault product={store} store={true} />
            </div>
            {/* <DefaultDescription /> */}
        </div>
    );
};

export default UnStoreDetailFullwidth;
