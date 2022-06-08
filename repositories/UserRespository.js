import Repository, { baseUrl, getError } from './Repository';

const routes = {
    getUserInfo: '/user/user-details',
    stripeCodeVerification: '/user/stripe-auth',
    updateUserName: '/user/add-update-username',
    profileUpdate: '/user/add-update-profile-picture',
    biddingEmail: '/user/biddingEmail',
};

class AuthenticationRepository {
    async getUserInfo() {
        try {
            const request = await Repository.get(
                `${baseUrl}${routes.getUserInfo}`
            );
            return request.data.data;
        } catch (error) {
            throw getError(error);
        }
    }

    async stripeVerification(code) {
        try {
            const request = await Repository.post(
                `${baseUrl}${routes.stripeCodeVerification}`,
                { code }
            );
            return request.data;
        } catch (error) {
            throw getError(error);
        }
    }

    async changeBiddingEmail(email) {
        try {
            const request = await Repository.post(
                `${baseUrl}${routes.biddingEmail}`,
                { biddingEmail: email }
            );
            return request;
        } catch (error) {
            throw getError(error);
        }
    }

    async updateProfilePhoto(image) {
        try {
            const formData = new FormData();
            formData.append('profilePicture', image.originFileObj);
            const request = await Repository.post(
                `${baseUrl}${routes.profileUpdate}`,
                formData
            );
            return request.data;
        } catch (error) {
            throw getError(error);
        }
    }
    async updateUserName(username) {
        try {
            const request = await Repository.post(
                `${baseUrl}${routes.updateUserName}`,
                { username }
            );
            return request.data;
        } catch (error) {
            throw getError(error);
        }
    }
}

export default new AuthenticationRepository();
