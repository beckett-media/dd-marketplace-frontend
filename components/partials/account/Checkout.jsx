import React from 'react';
import FormCheckoutInformation from './modules/FormCheckoutInformation';
import ModulePaymentOrderSummary from '~/components/partials/account/modules/ModulePaymentOrderSummary';
const Checkout = (auctionProduct) => {
    return (
        <div className="ps-checkout ps-section--shopping">
            <div className="container">
                <div className="ps-section__header">
                    <h1>Summary</h1>
                </div>
                <div className="ps-section__content">
                    <div className="ps-form--checkout">
                        <div className="ps-form__content">
                            <div className="row">
                                <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 order-last order-lg-first">
                                    <FormCheckoutInformation
                                        auctionProduct={
                                            auctionProduct &&
                                            auctionProduct.auctionProduct
                                        }
                                    />
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12  ps-block--checkout-order order-first order-lg-last">
                                    <div className="ps-form__orders">
                                        <h3>Your order</h3>
                                        <ModulePaymentOrderSummary
                                            auctionProduct={
                                                auctionProduct &&
                                                auctionProduct.auctionProduct
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
