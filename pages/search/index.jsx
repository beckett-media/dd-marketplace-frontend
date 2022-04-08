import React, { useEffect, useState } from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import Product from '~/components/elements/products/Product';
import Title from '~/components/elements/Title';
import ContainerPage from '~/components/layouts/ContainerPage';
import ProductGroupGridItems from '~/components/partials/product/ProductGroupGridItems';
import ProductRepository from '~/repositories/ProductRepository.js';

const SearchPage = ({ query }) => {
    const [pageSize] = useState(50);
    const [keyword, setKeyword] = useState('');
    const [loading, setLoading] = useState(true);
    const [productItems, setProductItems] = useState(null);

    function handleSetKeyword() {
        if (query && query.keyword !== '') {
            setKeyword(query.keyword);
        } else {
            setKeyword('');
        }
    }

    async function getProductsByKeyword(keyword) {
        handleSetKeyword();
        const queries = {
            _limit: pageSize,
            title_contains: keyword,
        };
        setLoading(true);
        const SPProducts = await ProductRepository.searchListingElastic(
            queries
        );
        if (SPProducts) {
            if (SPProducts.data?.listings.length > 0) {
                setProductItems(SPProducts?.data?.listings);
            } else {
                setProductItems(null);
            }

            setTimeout(function () {
                setLoading(false);
            }, 500);

            return SPProducts;
        } else {
            setProductItems(null);
            return null;
        }
    }

    useEffect(() => {
        getProductsByKeyword(query.keyword);
    }, [query]);

    const breadcrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Search Result',
        },
    ];

    let shopItemsView, statusView;
    if (!loading) {
        if (productItems) {
            shopItemsView = (
                <ProductGroupGridItems columns={6} pageSize={pageSize} />
            );
            if (productItems.length > 0) {
                const items = productItems.map((item) => {
                    return (
                        <div
                            className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12"
                            key={item.id}>
                            <Product product={item} />
                        </div>
                    );
                });
                shopItemsView = (
                    <div className="ps-product-items row ps-product-list ps-new-arrivals">
                        {items}
                    </div>
                );
                statusView = (
                    <p>
                        <strong>{productItems.length}</strong> record(s) found.
                    </p>
                );
            } else {
                shopItemsView = (
                    <p style={{ color: '#fff' }}>No product(s) found.</p>
                );
            }
        } else {
            shopItemsView = <p>No product(s) found.</p>;
        }
    } else {
        statusView = <p>Searching...</p>;
    }

    return (
        <ContainerPage title={`Search results for: "${keyword}" `} boxed={true}>
            <div className="ps-shop--search ps-search-page-responsive">
                <div className="ps-container">
                    <div className="ps-section__header">
                        <div className="ps-shop__header">
                            <Title title={`Search result for: ${keyword}`} />
                        </div>
                    </div>
                    <div className="ps-section__content">
                        <div className="row">
                            {statusView}
                            {shopItemsView}
                        </div>
                    </div>
                </div>
            </div>
        </ContainerPage>
    );
};

SearchPage.getInitialProps = async ({ query }) => {
    return { query: query };
};

export default SearchPage;
