import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { authState } from "states/auth";

const LogoutPage = () => {
  const setauth = useSetRecoilState(authState);

  useEffect(() => {
    setauth(null);
  }, []);

  return null;
};

export default LogoutPage;
