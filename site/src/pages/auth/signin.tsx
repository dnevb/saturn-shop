import { T } from "components";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { authState } from "states/auth";
import f from "utils/f";
import SigninForm from "./form";

const SigninPage = () => {
  const methods = useForm();
  const setauth = useSetRecoilState(authState);
  const submit = methods.handleSubmit(async (values) =>
    f.post("/.auth/signin", values).then((res) => setauth(res.data))
  );

  return (
    <div className="py-6 sm:py-8 lg:py-12">
      <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
        <T size="h3" className="text-center mb4">
          Sign in
        </T>
        <div className="max-w-lg border rounded-lg mx-auto">
          <form
            autoComplete="off"
            onSubmit={submit}
            className="flex flex-col gap-4 p-4 md:p-8"
          >
            <SigninForm {...methods} />
          </form>
          <div className="flex justify-center items-center bg-gray-100 p-4">
            <p className="text-gray-500 text-sm text-center">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-indigo-500 hover:text-indigo-600 active:text-indigo-700 transition duration-100"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
