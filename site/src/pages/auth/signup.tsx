import { Button, Input, T } from "components";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { authState } from "states/auth";
import f from "utils/f";

const SignupPage = () => {
  const methods = useForm();
  const setauth = useSetRecoilState(authState);
  const submit = methods.handleSubmit(async (values) =>
    f
      .post("/.auth/signup", values)
      .then((res) => setauth(res.data))
      .catch((e) => e)
  );

  return (
    <div className="py-6 sm:py-8 lg:py-12">
      <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
        <T size="h3" className="text-center mb4">
          Sign up
        </T>
        <div className="max-w-lg border rounded-lg mx-auto">
          <form
            autoComplete="off"
            onSubmit={submit}
            className="flex flex-col gap-4 p-4 md:p-8"
          >
            <Input
              label="First name"
              {...methods.register("first_name", { required: true })}
            />
            <Input
              label="Last name"
              {...methods.register("last_name", { required: true })}
            />
            <Input
              label="Email"
              type="email"
              {...methods.register("email", { required: true })}
            />

            <Input
              label="Password"
              type="password"
              {...methods.register("password", { required: true })}
            />

            <Button disabled={!methods.formState.isValid}>Sign up</Button>
          </form>
          <div className="flex justify-center items-center bg-gray-100 p-4">
            <p className="text-gray-500 text-sm text-center">
              Have an account?{" "}
              <Link
                to="/signin"
                className="text-indigo-500 hover:text-indigo-600 active:text-indigo-700 transition duration-100"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
