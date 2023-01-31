import { Button, Input } from "components";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { authState } from "states/auth";
import f from "utils/f";

const SigninForm = () => {
  const methods = useForm();
  const setauth = useSetRecoilState(authState);
  const submit = methods.handleSubmit(async (values) =>
    f
      .post("/.auth/signin", values)
      .then((res) => setauth(res.data))
      .catch((e) => e)
  );

  const loading = methods.formState.isSubmitting;

  return (
    <form
      autoComplete="off"
      onSubmit={submit}
      className="flex flex-col gap-4 p-4 md:p-8"
    >
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

      <Button loading={loading} disabled={!methods.formState.isValid}>
        Sign in
      </Button>
    </form>
  );
};

export default SigninForm;
