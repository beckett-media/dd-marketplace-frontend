import Repository, { baseUrl, getError } from './Repository';

const routes = {
    saveAddress: '/address/add',
    getAddress: '/address',
    makeDefault: '/address/change',
    editAddress: '/address/edit',
    deleteAddress: '/address/remove',
    checkout: '/order/checkout',
    auctionCheckout: '/order/auction-checkout',
    validatePromoCode: '/promo/validate',
};

class CheckoutRepository {
    async saveAddress(address) {
        try {
            const url = `${baseUrl}${routes.saveAddress}`;
            const response = await Repository.post(url, address);
            return response.data;
        } catch (error) {
            throw getError(error);
        }
    }
    async editAddress(address, addressId) {
        try {
            const url = `${baseUrl}${routes.editAddress}/${addressId}`;

            if (address._id) delete address._id;
            const response = await Repository.post(url, address);
            return response.data;
        } catch (error) {
            throw getError(error);
        }
    }
    async deleteAddress(addressId) {
        try {
            const url = `${baseUrl}${routes.deleteAddress}/${addressId}`;
            const response = await Repository.delete(url);
            return response.data;
        } catch (error) {
            throw getError(error);
        }
    }
    async getSavedAddress() {
        try {
            const url = `${baseUrl}${routes.getAddress}`;
            const response = await Repository.get(url);
            return response.data;
        } catch (error) {
            throw getError(error);
        }
    }
    async makeDefaultAddress(addressId) {
        try {
            const url = `${baseUrl}${routes.makeDefault}/${addressId}`;
            const response = await Repository.post(url, {
                isDefaultAddress: true,
            });
            return response.data;
        } catch (error) {
            throw getError(error);
        }
    }

    async checkoutComplete(payload) {
        try {
            const { token, ...rest } = payload;
            const url = `${baseUrl}${routes.checkout}`;
            const response = await Repository.post(url, {
                cardToken: token,
                ...rest,
            });
            return response.data;
        } catch (error) {
            throw getError(error);
        }
    }
    async auctionCheckoutComplete(payload) {
        try {
            const { token, ...rest } = payload;
            const url = `${baseUrl}${routes.auctionCheckout}`;
            const response = await Repository.post(url, {
                cardToken: token,
                ...rest,
            });
            return response.data;
        } catch (error) {
            throw getError(error);
        }
    }
    async validatePromo(payload) {
        try {
            const url = `${baseUrl}${routes.validatePromoCode}`;
            const response = await Repository.post(url, payload);
            return response.data;
        } catch (error) {
            throw getError(error);
        }
    }
}

export default new CheckoutRepository();
