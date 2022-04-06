import React, { useEffect } from 'react';
import Logo from '~/components/elements/common/Logo';
import HeaderActions from '~/components/shared/headers/modules/HeaderActions';
import SearchHeader from '~/components/shared/headers/modules/SearchHeader';
import MenuCategoriesDropdown from '~/components/shared/menus/MenuCategoriesDropdown';
import { stickyHeader } from '~/utilities/common-helpers';

const HeaderDefault = ({ hideScrollEvent }) => {
    useEffect(() => {
        if (process.browser && !hideScrollEvent) {
            window.addEventListener('scroll', stickyHeader);
        }
    }, []);

    return (
        <header
            className="header header--1"
            data-sticky="true"
            // id="headerSticky"
        >
            <div className="header__top">
                <div className="ps-container">
                    <div className="header__left">
                        <Logo />
                        <MenuCategoriesDropdown />
                    </div>
                    <div className="header__center">
                        <SearchHeader />
                    </div>
                    <div className="header__right">
                        <HeaderActions />
                    </div>
                </div>
            </div>
            {/* <NavigationDefault /> */}
        </header>
    );
};

export default HeaderDefault;
