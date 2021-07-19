import Repository, { baseUrl } from './Repository';

const routes = {
    saveAddress: '/address/add',
    getAddress: '/address',
    makeDefault: '/address/change',
    editAddress: '/address/edit',
    deleteAddress: '/address/remove',
    checkout: '/order/checkout',
};

class CheckoutRepository {
    async saveAddress(address) {
        const url = `${baseUrl}${routes.saveAddress}`;
        const response = await Repository.post(url, address);
        return response.data;
    }
    async editAddress(address, addressId) {
        const url = `${baseUrl}${routes.editAddress}/${addressId}`;

        if (address._id) delete address._id;
        const response = await Repository.post(url, address);
        return response.data;
    }
    async deleteAddress(addressId) {
        const url = `${baseUrl}${routes.deleteAddress}/${addressId}`;
        const response = await Repository.delete(url);
        return response.data;
    }
    async getSavedAddress() {
        const url = `${baseUrl}${routes.getAddress}`;
        const response = await Repository.get(url);
        return response.data;
    }
    async makeDefaultAddress(addressId) {
        const url = `${baseUrl}${routes.makeDefault}/${addressId}`;
        const response = await Repository.post(url, { isDefaultAddress: true });
        return response.data;
    }

    async checkoutComplete({ addressId, token, listingIds }) {
        console.log('token: checkoutComplete', {
            addressId,
            token,
            listingIds,
        });
        const url = `${baseUrl}${routes.checkout}`;
        console.log('url: checkoutComplete', url);
        const response = await Repository.post(url, {
            cardToken: token,
            addressId,
            listingIds,
        });
        console.log('response: checkoutComplete', response);
        return response.data;
    }
}

export default new CheckoutRepository();
