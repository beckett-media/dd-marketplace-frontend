import Repository, { baseUrl, getError } from './Repository';
import { getOsType } from './utils';
const randomstring = require('randomstring');

const routes = {
    register: '/user/register-user',
    login: '/authenticate/sign-in-user',
    logout: '/authenticate/sign-out',
    verifyotp: '/user/verify-otp',
    generateoptp: '/user/generate-otp',
    changepassword: '/user/new-password',
};

const deviceToken = randomstring.generate();

class AuthenticationRepository {
    async register(payload) {
        try {
            const postObject = { osType: getOsType(), deviceToken, ...payload };
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
            throw getError(error);
        }
    }
    async login(payload) {
        try {
            const postObject = { osType: getOsType(), deviceToken, ...payload };
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
            throw getError(error);
        }
    }
    async logout() {
        try {
            const val = await Repository.post(`${baseUrl}${routes.logout}`, {
                deviceToken,
            });
            
        } catch (error) {
            throw getError(error);
        }
    }
    async sendotp({ email }) {
        try {
            return await Repository.post(`${baseUrl}${routes.generateoptp}`, {
                email,
            });
        } catch (error) {
            throw getError(error);
        }
    }
    async verifyOtp({ email, otp }) {
        try {
            return await Repository.post(`${baseUrl}${routes.verifyotp}`, {
                email,
                otp,
            });
        } catch (error) {
            throw getError(error);
        }
    }
    async newpassword({ email, newPassword }) {
        try {
            return await Repository.post(`${baseUrl}${routes.changepassword}`, {
                email,
                newPassword,
            });
        } catch (error) {
            throw getError(error);
        }
    }
}

export default new AuthenticationRepository();
