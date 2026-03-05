import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isPending: isLogging } = useMutation({
    mutationFn: loginApi,
    onSuccess: ({
      user: {
        user_metadata: { fullName },
      },
    }) => {
      toast.success(
        `Welcome back${fullName?.split(" ")[0] ? `, ${fullName?.split(" ")[0]}` : ""} 👋`,
      );
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      navigate("/dashboard", { replace: true });
    },
    onError: () => toast.error("Invalid email or password"),
  });

  return { login, isLogging };
}

export { useLogin };
