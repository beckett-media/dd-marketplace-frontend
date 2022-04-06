import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { login } from '~/store/auth/action';
import { useRouter } from 'next/router';
import SimpleCrypto from 'simple-crypto-js';
var simpleCrypto = new SimpleCrypto('myTotalySecretKey');

const CrossOriginLogin = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { auth } = router.query;
    useEffect(() => {
        if (auth) {
            var currentURL =
                window.location.protocol +
                '//' +
                location.host +
                location.pathname;
            let tokens = simpleCrypto.decrypt(decodeURIComponent(auth));
            console.log('tokens: ', tokens);
            dispatch(login({ tokens }));
            router.replace(currentURL, undefined, { shallow: true });
        }
    }, [auth]);

    return null;
};

export default CrossOriginLogin;
