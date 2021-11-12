import React from 'react';
import { baseUrl } from '~/repositories/Repository';

const ModuleStoreInformation = ({ store }) => {
    const soresToDisplay = store.store || store;
    if (store) {
        return (
            <div className="ps-block--vendor">
                <div className="ps-block__thumbnail">
                    <img
                        src={`${
                            soresToDisplay?.images?.length > 0
                                ? `${baseUrl}/${soresToDisplay.images[0]}`
                                : '/static/img/not-found.jpg'
                        }`}
                        alt="store logo"
                    />
                </div>
                <div className="ps-block__container">
                    <div className="ps-block__header">
                        <h4>{soresToDisplay.title}</h4>
                    </div>
                    <div className="ps-block__divider"></div>
                    <div className="ps-block__content">
                        <p>{soresToDisplay.desc}</p>
                    </div>

                    {soresToDisplay.email && (
                        <div className="ps-block__content">
                            <bold
                                style={{
                                    color: '#000',
                                    fontWeight: 'bold',
                                }}>
                                Email:
                            </bold>
                            <a
                                href={`mailto:${soresToDisplay.email}`}
                                className="control-width-wrap">
                                {soresToDisplay.email}
                            </a>
                        </div>
                    )}

                    {soresToDisplay.address && (
                        <div className="ps-block__content">
                            <bold style={{ color: '#000', fontWeight: 'bold' }}>
                                Address:
                            </bold>
                            <address className="control-width-wrap">
                                {soresToDisplay.address}
                            </address>
                        </div>
                    )}

                    {soresToDisplay.phoneNumber && (
                        <div className="ps-block__content">
                            <bold style={{ color: '#000', fontWeight: 'bold' }}>
                                Contact #
                            </bold>
                            <address className="control-width-wrap">{soresToDisplay.phoneNumber}</address>
                        </div>
                    )}
                </div>
            </div>
        );
    } else {
        retu;
    }
};

export default ModuleStoreInformation;
