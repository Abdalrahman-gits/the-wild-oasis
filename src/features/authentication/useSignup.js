import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiAuth";
import { toast } from "react-toastify";

function useSignup() {
  const { mutate: signup, isPending: isRegistering } = useMutation({
    mutationFn: signUpApi,
    onSuccess: () => {
      toast.success(
        "Account created successfully! Please verify the account from user's email",
      );
    },

    onError: () => {
      toast.error("Error during signUp");
    },
  });

  return { signup, isRegistering };
}

export { useSignup };
