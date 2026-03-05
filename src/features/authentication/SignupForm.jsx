import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    getValues,
    reset,
  } = useForm();
  const { signup, isRegistering } = useSignup();

  const isLoading = isSubmitting || isRegistering;

  function handleSignupSubmit(data) {
    signup(data, { onSettled: () => reset() });
  }

  return (
    <Form onSubmit={handleSubmit(handleSignupSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", {
            required: "This field is required",
            minLength: {
              value: 1,
              message: "Full name chars must be greater than 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          {...register("email", {
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Email should be in a valid form",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password min chars is 8",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.confirmPassword?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          {...register("confirmPassword", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password min chars is 8",
            },
            validate: (value) =>
              value === getValues()?.password ||
              "This value must be equal to password",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isLoading}>
          Cancel
        </Button>
        <Button disabled={isLoading} type="submit">
          Create new user
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
