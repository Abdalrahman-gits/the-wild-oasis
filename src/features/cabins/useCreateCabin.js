import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addEditCabin } from "../../services/apiCabins";
import { toast } from "react-toastify";

export function useCreateCabin() {
  const queryClient = useQueryClient();
  // 1. Control Creating cabin.
  const { isPending: isCreating, mutate: createCabin } = useMutation({
    mutationFn: addEditCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("Cabin Added Successfully");
    },

    onError: (error) => toast.error(error.message),
  });

  return { isCreating, createCabin };
}
