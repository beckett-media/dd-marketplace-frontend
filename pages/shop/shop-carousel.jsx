import React from 'react';
import ContainerShop from '~/components/layouts/ContainerShop';
import ProductGroupByCarousel from '~/components/partials/product/ProductGroupByCarousel';
import ShopCarouselBanner from '~/components/partials/shop/ShopCarouselBanner';
import ShopCarouselTopDeal from '~/components/partials/shop/ShopCarouselTopDeal';

const ShopCategoriesPage = () => {
    return (
        <ContainerShop title="Shop Carousel" boxed={true}>
            <div className="ps-page--shop" id="shop-carousel">
                <div className="container">
                    <ShopCarouselBanner />
                    <ShopCarouselTopDeal collectionSlug="shop-top-deals-super-hot-today" />

                    <ProductGroupByCarousel
                        collectionSlug="best-seller-products"
                        title="Best Seller Products"
                    />
                    <ProductGroupByCarousel
                        collectionSlug="new-arrivals-products"
                        title="Best Seller Products"
                    />
                </div>
            </div>
        </ContainerShop>
    );
};

export default ShopCategoriesPage;
