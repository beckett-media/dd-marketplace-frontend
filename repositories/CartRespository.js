import Repository, { baseUrl, getError } from './Repository';

const routes = {
    add: '/cart/add',
    remove: '/cart/remove',
    get: '/cart',
};

class CartRepository {
    async addToCart(listingId) {
        try {
            const url = `${baseUrl}${routes.add}/${listingId}`;
            const response = await Repository.post(url);

            return response;
        } catch (error) {
            throw getError(error);
        }
    }
    async removeToCart(listingId) {
        try {
            const url = `${baseUrl}${routes.remove}/${listingId}`;
            const response = await Repository.post(url);

            return response;
        } catch (error) {
            throw getError(error);
        }
    }
    async getCart() {
        try {
            const url = `${baseUrl}${routes.get}`;
            const response = await Repository.get(url);

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    }
}

export default new CartRepository();
