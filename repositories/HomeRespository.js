import Repository, { baseUrl } from './Repository';

const routes = {
    marketplace: '/marketplace',
};

class HomeRespository {
    async getmarketPlace() {
        const request = await Repository.get(`${baseUrl}${routes.marketplace}`);
        return request?.data?.data || {};
    }
}

export default new HomeRespository();

/*
grades
newArrival
products
recommendation
trendingCards
trendingPlayers

*/
