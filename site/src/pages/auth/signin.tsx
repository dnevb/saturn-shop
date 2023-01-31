import { Button, Input, T } from "components";

const SigninPage = () => {
  return (
    <div className="py-6 sm:py-8 lg:py-12">
      <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
        <T size="h3" className="text-center mb4">
          Sign in
        </T>
        <div className="max-w-lg border rounded-lg mx-auto">
          <form className="flex flex-col gap-4 p-4 md:p-8">
            <Input label="Email" type="email" required />
            <Input label="Password" type="password" required />

            <Button>Sign in</Button>
          </form>
          <div className="flex justify-center items-center bg-gray-100 p-4">
            <p className="text-gray-500 text-sm text-center">
              Don't have an account?{" "}
              <a
                href="#"
                className="text-indigo-500 hover:text-indigo-600 active:text-indigo-700 transition duration-100"
              >
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
