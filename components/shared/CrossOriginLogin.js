import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { login } from "~/store/auth/action";
import { useRouter } from "next/router";
import SimpleCrypto from "simple-crypto-js";
var simpleCrypto = new SimpleCrypto("myTotalySecretKey");

const CrossOriginLogin = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  var currentURL=location.protocol + '//' + location.host + location.pathname;
  console.log('currentURL: ', currentURL);

  const { auth } = router.query;
  console.log('auth: ', auth);
  useEffect(() => {
    if (auth) {
      let tokens = simpleCrypto.decrypt(decodeURIComponent(auth));
      console.log('tokens: ', tokens);
      dispatch(login({ tokens }));
      router.replace(currentURL, undefined, { shallow: true });
    }
  }, [auth]);

  return null;
};

export default CrossOriginLogin;
