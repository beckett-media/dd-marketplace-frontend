import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { login } from "~/store/auth/action";
import { useRouter } from "next/router";
import SimpleCrypto from "simple-crypto-js";
var simpleCrypto = new SimpleCrypto("myTotalySecretKey");

const CrossOriginLogin = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { auth } = router.query;
  useEffect(() => {
    if (auth) {
      let tokens = simpleCrypto.decrypt(decodeURIComponent(auth));
      dispatch(login({ tokens }));
      router.replace(router.asPath, undefined, { shallow: true });
    }
  }, [auth]);

  return null;
};

export default CrossOriginLogin;
