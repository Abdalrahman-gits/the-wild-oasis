import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addEditCabin } from "../../services/apiCabins";
import { toast } from "react-toastify";

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { isPending: isEditting, mutate: editCabin } = useMutation({
    mutationFn: ({ cabinData, id }) => addEditCabin(cabinData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("Cabin Editted Successfully");
    },

    onError: (error) => toast.error(error.message),
  });

  return { isEditting, editCabin };
}
