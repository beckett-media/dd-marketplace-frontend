import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import ProductRepository from '~/repositories/ProductRepository';

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
                const products = ProductRepository.getRecords(queries);
                products.then((result) => {
                    console.log(result);
                    setLoading(false);
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
                {/* <input
                    ref={inputEl}
                    className="form-control"
                    type="text"
                    value={keyword}
                    placeholder="I'm shopping for..."
                    onChange={(e) => setKeyword(e.target.value)}
                /> */}
                {/* {clearTextView} */}
                {/* {loadingView} */}
            </div>
            {/* <button onClick={handleSubmit}>Search</button> */}
            <div
                className={`ps-panel--search-result${
                    isSearch ? ' active ' : ''
                }`}>
                {/* <div className="ps-panel__content">{productItemsView}</div> */}
                {/* {loadMoreView} */}
            </div>
        </form>
    );
};

export default SearchHeader;
