import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function useLogin() {
  const navigate = useNavigate();

  const { mutate: login, isPending: isLogging } = useMutation({
    mutationFn: loginApi,
    onSuccess: () => {
      toast.success("Welcome back");
      navigate("/dashboard");
    },
    onError: () => toast.error("Invalid email or password"),
  });

  return { login, isLogging };
}

export { useLogin };
