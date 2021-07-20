import Repository, { baseUrl, getError } from './Repository';

const routes = {
    get: '/order/pending',
};

class InvoicesRepository {
    async getInvoices() {
        try {
            const url = `${baseUrl}${routes.get}`;
            const response = await Repository.get(url);
            console.log('response: getInvoices', response);
            return response;
        } catch (error) {
            throw getError(error);
        }
    }
}

export default new InvoicesRepository();
