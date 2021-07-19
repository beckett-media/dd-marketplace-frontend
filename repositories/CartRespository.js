import Repository, { baseUrl } from './Repository';

const routes = {
    add: '/cart/add',
    remove: '/cart/remove',
    get: '/cart',
};

class CartRepository {
    async addToCart(listingId) {
        const url = `${baseUrl}${routes.add}/${listingId}`;
        const response = await Repository.post(url);

        return response;
    }
    async removeToCart(listingId) {
        const url = `${baseUrl}${routes.remove}/${listingId}`;
        const response = await Repository.post(url);

        return response;
    }
    async getCart() {
        const url = `${baseUrl}${routes.get}`;
        const response = await Repository.get(url);

        return response.data;
    }
}

export default new CartRepository();
