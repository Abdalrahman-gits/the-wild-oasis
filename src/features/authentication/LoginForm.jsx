import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";

function LoginForm() {
  const [email, setEmail] = useState("abdalrahmangamal100@exmple.com");
  const [password, setPassword] = useState("password123");
  const [errors, setErrors] = useState({});
  const { login, isLogging } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    let tempErrors = {};

    if (!email.trim().length) tempErrors.email = "Invalid email";
    if (!password.trim().length) tempErrors.password = "Invalid password";

    if (tempErrors.email || tempErrors.password) {
      for (const field in tempErrors)
        setErrors((errs) => ({ ...errs, [field]: tempErrors[field] }));
      return;
    }

    login({ email, password });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address" error={errors?.email}>
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors((errs) => ({ ...errs, email: "" }));
          }}
          disabled={isLogging}
        />
      </FormRowVertical>
      <FormRowVertical label="Password" error={errors?.password}>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors((errs) => ({ ...errs, password: "" }));
          }}
          disabled={isLogging}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isLogging}>
          {!isLogging ? "Login" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
