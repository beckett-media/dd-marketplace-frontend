import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import ProductRepository from '~/repositories/ProductRepository';
import ProductSearchResult from '~/components/elements/products/ProductSearchResult';

const exampleCategories = ['Listing', 'Stores'];

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        // Update debounced value after delay
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

const SearchHeader = () => {
    const [isSearch, setIsSearch] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [loading, setLoading] = useState(false);
    const debouncedSearchTerm = useDebounce(keyword, 300);

    function handleSubmit(e) {
        setIsSearch(false);
        e.preventDefault();
        Router.push(`/search?keyword=${keyword}`);
    }

    useEffect(() => {
        if (debouncedSearchTerm) {
            setLoading(true);
            if (keyword) {
                const queries = {
                    _limit: 5,
                    title_contains: keyword,
                };
                const products =
                    ProductRepository.searchListingElastic(queries);
                products.then((result) => {
                    setLoading(false);
                    setResultItems(result?.data?.listings);
                    setIsSearch(true);
                });
            } else {
                setIsSearch(false);
                setKeyword('');
            }
            if (loading) {
                setIsSearch(false);
            }
        } else {
            setLoading(false);
            setIsSearch(false);
        }
    }, [debouncedSearchTerm]);

    return (
        <form
            className="ps-form--quick-search"
            method="get"
            action="/"
            onSubmit={handleSubmit}>
            {/* <div className="ps-form__categories">
                <select className="form-control">{selectOptionView}</select>
            </div> */}
            <div className="ps-form__input">
                <input
                    ref={inputEl}
                    className="form-control"
                    type="text"
                    value={keyword}
                    placeholder="Search by player, brand, year, grade, sport and more..."
                    onChange={(e) => setKeyword(e.target.value)}
                />
                {clearTextView}
                {loadingView}
            </div>
            <button onClick={handleSubmit}>Search</button>
            <div
                className={`ps-panel--search-result${
                    isSearch ? ' active ' : ''
                }`}
                style={{
                    backgroundColor: '#0B2644',
                    borderRadius: '0 0 20px 20px',
                }}>
                <div
                    className="ps-panel__content"
                    style={{
                        backgroundColor: '#0B2644',
                    }}>
                    {productItemsView}
                </div>
                {loadMoreView}
            </div>
        </form>
    );
};

export default SearchHeader;
