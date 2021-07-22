import Repository, { baseUrl, getError } from './Repository';

const routes = {
    get: '/listing/buying',
};

class InvoicesRepository {
    async getInvoices() {
        try {
            const page = 1;
            const perPage = 100;
            const url = `${baseUrl}${routes.get}/${perPage}/${page}`;
            const response = await Repository.get(url);
            console.log('response: getInvoices', response);
            return response.data;
        } catch (error) {
            throw getError(error);
        }
    }
}

export default new InvoicesRepository();
