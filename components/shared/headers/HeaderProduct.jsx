import React from 'react';
import Logo from '~/components/elements/common/Logo';
import HeaderActions from '~/components/shared/headers/modules/HeaderActions';
import MenuCategories from '~/components/shared/headers/modules/MenuCategories';
import SearchHeader from '~/components/shared/headers/modules/SearchHeader';

const HeaderProduct = () => {
    return (
        <header className="header header--1 header--product" data-sticky="true">
            <div className="header__top">
                <div className="ps-container">
                    <div className="header__left">
                        <Logo />
                        <div className="menu--product-categories">
                            <div className="menu__toggle">
                                <i className="icon-menu"></i>
                                <span> Shop by Department</span>
                            </div>
                            <div className="menu__content">
                                <MenuCategories />
                            </div>
                        </div>
                    </div>
                    <div className="header__center">
                        <SearchHeader />
                    </div>
                    <div className="header__right">
                        <HeaderActions />
                    </div>
                </div>
            </div>
        </header>
    );
};
export default HeaderProduct;
