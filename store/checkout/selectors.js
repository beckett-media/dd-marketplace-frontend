const getData = (state) => state.checkout;

export const getSavedAddress = (state) => getData(state).savedAddress;

export const getDefaultAddress = (state) => {
    const address = getSavedAddress(state);
    const selected = address.find((i) => i.selected);
    if (selected) return selected;
    const isDefaultAddress = address.find((i) => i.isDefaultAddress);
    return isDefaultAddress;
};

export const getPromoPercentage = (state) =>
    getData(state).promo?.percentage || 0;

export const getCheckoutLoading = (state) => getData(state).isCheckoutLoading;
