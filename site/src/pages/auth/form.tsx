import { Button, Input } from "components";
import { FC } from "react";
import { UseFormReturn } from "react-hook-form";

const SigninForm: FC<UseFormReturn> = (props) => {
  return (
    <>
      <Input
        label="Email"
        type="email"
        {...props.register("email", { required: true })}
      />

      <Input
        label="Password"
        type="password"
        {...props.register("password", { required: true })}
      />

      <Button disabled={!props.formState.isValid}>Sign in</Button>
    </>
  );
};

export default SigninForm;
