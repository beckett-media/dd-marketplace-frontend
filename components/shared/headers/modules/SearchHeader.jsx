import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Spin } from 'antd';
import Router from 'next/router';
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
    const inputEl = useRef(null);
    const [isSearch, setIsSearch] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [loading, setLoading] = useState(false);
    const [resultItems, setResultItems] = useState([]);
    const debouncedSearchTerm = useDebounce(keyword, 300);

    function handleClearKeyword() {
        setKeyword('');
        setIsSearch(false);
        setLoading(false);
    }

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

    let productItemsView,
        clearTextView,
        selectOptionView,
        loadingView,
        loadMoreView;
    if (!loading) {
        if (resultItems.length > 0) {
            if (resultItems.length > 5) {
                loadMoreView = (
                    <div className="ps-panel__footer text-center">
                        <Link href="/search">
                            <a>See all results</a>
                        </Link>
                    </div>
                );
            }
            productItemsView = resultItems.map((product) => (
                <ProductSearchResult product={product} key={product.id} />
            ));
        } else {
            productItemsView = (
                <p
                    style={{
                        color: '#fff',
                    }}>
                    No product found.
                </p>
            );
        }
        if (keyword !== '') {
            clearTextView = (
                <span
                    className="ps-form__action"
                    style={{
                        cursor: 'pointer',
                    }}
                    onClick={handleClearKeyword}>
                    <i className="icon icon-cross2"></i>
                </span>
            );
        }
    } else {
        loadingView = (
            <span className="ps-form__action">
                <Spin size="small" />
            </span>
        );
    }

    selectOptionView = exampleCategories.map((option) => (
        <option value={option} key={option}>
            {option}
        </option>
    ));

    return (
        <form
            className="ps-form--quick-search"
            method="get"
            action="/"
            onSubmit={handleSubmit}>
            {/* <div className="ps-form__categories">
                <select className="form-control">{selectOptionView}</select>
            </div> */}
            <div className="ps-form__input dark">
                <input
                    ref={inputEl}
                    className="form-control"
                    style={{
                        color: '#000',
                    }}
                    type="text"
                    value={keyword}
                    placeholder="Search by player, brand, year, grade, sport and more..."
                    onChange={(e) => setKeyword(e.target.value)}
                />
                {clearTextView}
                {loadingView}
            </div>
            <button
                style={{
                    backgroundColor: 'cadetblue',
                }}
                onClick={handleSubmit}>
                Search
            </button>
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
