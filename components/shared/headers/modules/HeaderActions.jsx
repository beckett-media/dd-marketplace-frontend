import React from 'react';
import { connect } from 'react-redux';
import AccountQuickLinks from '~/components/shared/headers/modules/AccountQuickLinks';
import MiniCart from '~/components/shared/headers/modules/MiniCart';

const HeaderActions = (props) => {
    const auth = props?.auth;
    // views
    let headerAuthView;
    if (auth.isLoggedIn && Boolean(auth.isLoggedIn) === true) {
        headerAuthView = <AccountQuickLinks isLoggedIn={true} />;
    } else {
        headerAuthView = <AccountQuickLinks isLoggedIn={false} />;
    }
    return (
        <div className="header__actions">
            {auth.isLoggedIn && Boolean(auth.isLoggedIn) && <MiniCart />}
            {headerAuthView}
        </div>
    );
};

export default connect((state) => state)(HeaderActions);
