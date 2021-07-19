import Repository, { baseUrl } from './Repository';

const routes = {
    getUserInfo: '/user/user-details',
    stripeCodeVerification: '/user/stripe-auth',
    updateUserName: '/user/add-update-username',
    profileUpdate: '/user/add-update-profile-picture',
};

class AuthenticationRepository {
    async getUserInfo() {
        try {
            const request = await Repository.get(
                `${baseUrl}${routes.getUserInfo}`
            );
            return request.data.data;
        } catch (error) {
            throw error;
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
            throw 'Auth token invalid or expired';
        }
    }
}

export default new AuthenticationRepository();
