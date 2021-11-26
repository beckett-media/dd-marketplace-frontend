import Repository, { baseUrl, getError } from './Repository';

const routes = {
    get: '/listing/invoices',
};

class InvoicesRepository {
    async getInvoices() {
        try {
            const page = 1;
            const perPage = 100;
            const url = `${baseUrl}${routes.get}/${perPage}/${page}`;
            const response = await Repository.get(url);

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    }
}

export default new InvoicesRepository();
