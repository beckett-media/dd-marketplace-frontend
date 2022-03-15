import React from 'react';
import ThumbnailDefault from '~/components/elements/detail/thumbnail/ThumbnailDefault';
import ModuleProductDetailDescription from '~/components/elements/detail/modules/ModuleProductDetailDescription';
import ModuleDetailShoppingActions from '~/components/elements/detail/modules/ModuleDetailShoppingActions';
import ModuleProductDetailSpecification from '~/components/elements/detail/modules/ModuleProductDetailSpecification';
import ModuleDetailActionsMobile from '~/components/elements/detail/modules/ModuleDetailActionsMobile';
import ModuleDetailTopInformation from '~/components/elements/detail/modules/ModuleDetailTopInformation';

const ProductDetailFullwidth = ({ product, placeBid, bidding }) => {
    return (
        <div className="ps-product--detail ps-product--fullwidth">
            <div className="ps-product__header">
                <ThumbnailDefault product={product} />
                <div className="ps-product__info">
                    <ModuleDetailTopInformation
                        product={product}
                        bidding={bidding}
                    />
                    <ModuleProductDetailDescription product={product} />
                    <ModuleDetailShoppingActions
                        product={product}
                        placeBid={placeBid}
                    />
                    <ModuleProductDetailSpecification product={product} />

                    <ModuleDetailActionsMobile
                        product={product}
                        bidding={bidding}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductDetailFullwidth;
