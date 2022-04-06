import React from 'react';
import ModuleDetailActionsMobile from '~/components/elements/detail/modules/ModuleDetailActionsMobile';
import ModuleDetailShoppingActions from '~/components/elements/detail/modules/ModuleDetailShoppingActions';
import ModuleDetailTopInformation from '~/components/elements/detail/modules/ModuleDetailTopInformation';
import ModuleProductDetailDescription from '~/components/elements/detail/modules/ModuleProductDetailDescription';
import ModuleProductDetailSpecification from '~/components/elements/detail/modules/ModuleProductDetailSpecification';
import ThumbnailDefault from '~/components/elements/detail/thumbnail/ThumbnailDefault';

const ProductDetailQuickView = ({ product }) => (
    <div className="ps-product--detail ps-product--quickview">
        <div className="ps-product__header">
            <ThumbnailDefault product={product} vertical={false} />
            <div className="ps-product__info">
                <ModuleDetailTopInformation product={product} />
                <ModuleProductDetailDescription product={product} />
                <ModuleDetailShoppingActions
                    product={product}
                    extended={true}
                />
                <ModuleProductDetailSpecification product={product} />
                {/* <ModuleProductDetailSharing /> */}
                <ModuleDetailActionsMobile product={product} />
            </div>
        </div>
    </div>
);

export default ProductDetailQuickView;
