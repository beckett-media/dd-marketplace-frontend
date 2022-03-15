import Repository, { baseUrl, serializeQuery } from './Repository';

const routes = {
    openBids: '/auction/open',
};

class ProductRepository {
    async getListingsByProduct(productId) {
        const page = 1;
        const perPage = 100;
        const url = `${baseUrl}${routes.openBids}/${productId}/${perPage}/${page}`;
        const request = await Repository.get(url);
        return request.data;
    }
    async getAuctionProductsById(payload) {
        const reponse = await Repository.get(`${baseUrl}/auction/${payload}`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }
    async getUserBidsAuction() {
        const reponse = await Repository.get(
            `${baseUrl}/auction/list-by-bidder`
        )
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }
}

export default new ProductRepository();
