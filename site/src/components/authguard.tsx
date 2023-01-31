import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "states/auth";

interface AuthGuardProps {
  children: JSX.Element;
  noauth?: boolean;
}

const AuthGuard: FC<AuthGuardProps> = ({ children, noauth }) => {
  const auth = useRecoilValue(authState);
  const nav = useNavigate();
  const [ready, setready] = useState(false);

  useEffect(() => {
    if (!auth) nav("signin");
    else if (auth.user["role"] == "admin") nav("admin");
    else nav("/");

    setready(true);
  }, [auth]);

  if (!ready) return <i className="i-ei-spinner-3" />;

  return children;
};

export default AuthGuard;
