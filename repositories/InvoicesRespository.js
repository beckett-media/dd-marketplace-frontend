import Repository, { baseUrl } from './Repository';

const routes = {
    get: '/order/pending',
};

class InvoicesRepository {
    async getInvoices() {
        const url = `${baseUrl}${routes.get}`;
        const response = await Repository.get(url);
        console.log('response: getInvoices', response);
        return response;
    }
}

export default new InvoicesRepository();
