import Repository, { baseUrl } from './Repository';
import { getOsType } from './utils';
const randomstring = require('randomstring');

const routes = {
    register: '/user/register-user',
    login: '/authenticate/sign-in-user',
    logout: '/authenticate/sign-out',
};

const deviceToken = randomstring.generate();

class AuthenticationRepository {
    async register(payload) {
        try {
            const postObject = { osType: 'linux', deviceToken, ...payload };
            const request = await Repository.post(
                `${baseUrl}${routes.register}`,
                postObject
            );
            const xAuthToken = request.headers['x-auth-token'];
            const refreshToken = request.headers['x-refresh-token'];
            return {
                tokens: { xAuthToken, refreshToken },
                payload: request.data,
            };
        } catch (error) {
            throw error;
        }
    }
    async login(payload) {
        try {
            const postObject = { osType: 'linux', deviceToken, ...payload };
            const request = await Repository.post(
                `${baseUrl}${routes.login}`,
                postObject
            );
            const xAuthToken = request.headers['x-auth-token'];
            const refreshToken = request.headers['x-refresh-token'];
            return {
                tokens: { xAuthToken, refreshToken },
                payload: request.data,
            };
        } catch (error) {
            throw error;
        }
    }
    async logout() {
        try {
            const val = await Repository.post(`${baseUrl}${routes.logout}`, {
                deviceToken,
            });
        } catch (error) {
            throw error;
        }
    }
}

export default new AuthenticationRepository();
