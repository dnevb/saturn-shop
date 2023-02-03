import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "states/auth";
import Spinner from "./spinner";

interface AuthGuardProps {
  children: JSX.Element;
  noauth?: boolean;
}

const AuthGuard: FC<AuthGuardProps> = ({ children, noauth }) => {
  const [ready, setready] = useState(false);
  const auth = useRecoilValue(authState);
  const nav = useNavigate();

  useEffect(() => {
    if (!auth) nav("signin");
    else nav("/");

    setready(true);
  }, [auth]);

  if (!ready) return <Spinner />;

  return children;
};

export default AuthGuard;
