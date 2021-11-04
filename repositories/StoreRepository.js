import Repository, {
    baseStoreURL,
    baseUrl,
    serializeQuery,
} from './Repository';

const routes = {
    store: '/store',
    uploadImages: '/store/update-store-images',
    deleteImage: '/store/image',
    getSportCard: '/sports-card/card-fac',
    getClaimStore: '/store/publicunclaimed',
};

class StoreRepository {
    constructor(callback) {
        this.callback = callback;
    }

    async getSelectedClaimedStore(storeId) {
        try {
            const request = await Repository.get(
                `${baseUrl}${routes.getClaimStore}/${storeId}`
            );
            return request.data;
        } catch (error) {
            throw getError(error);
        }
    }

    async getStores(payload) {
        const endPoint = `public-stores?${serializeQuery(payload)}`;
        const reponse = await Repository.get(`${baseUrl}/${endPoint}`)
            .then((response) => {
                if (response.data.data.stores.length > 0) {
                    return response.data.data.stores;
                } else {
                    return null;
                }
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
                return null;
            });
        return reponse;
    }

    async getStoreBySlug(payload) {
        const reponse = await Repository.get(
            `${baseUrl}/store/public/${payload}`
        )
            .then((response) => {
                return response.data.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getStoreItemsByKeyword(payload) {
        const reponse = await Repository.get(
            `${baseStoreURL}/posts?title_contains=${payload}`
        )
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getPostItemsByCategory(payload) {
        const reponse = await Repository.get(
            `${baseStoreURL}/posts?title_contains=${payload}`
        )
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }
}

export default new StoreRepository();
