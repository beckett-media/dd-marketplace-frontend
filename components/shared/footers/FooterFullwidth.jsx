import React from 'react';
import FooterCopyright from './modules/FooterCopyright';
import FooterWidgets from './modules/FooterWidgets';

const FooterFullwidth = () => (
    <footer className="ps-footer">
        <div className="ps-container">
            <FooterWidgets />
            {/* <FooterLinks /> */}
            <FooterCopyright />
        </div>
    </footer>
);

export default FooterFullwidth;
