import ForgotPassword from '~/components/partials/account/ForgotPassword';
import ContainerPage from '~/components/layouts/ContainerPage';

const ForgotPasswordPage = () => {
    return (
        <ContainerPage title="Login" boxed={true}>
            <div className="ps-page--my-account">
                <ForgotPassword />
            </div>
        </ContainerPage>
    );
};

export default ForgotPasswordPage;
