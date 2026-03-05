import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as apiDeleteBooking } from "../../services/apiBookings";
import { toast } from "react-toastify";

function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate: deleteBooking, isPending: isDeletingBooking } = useMutation({
    mutationFn: apiDeleteBooking,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ active: true });
      toast.success(`Booking #${data.id} deleted successfully`);
    },
    onError: () => toast.error("Something went wrong on deleting booking"),
  });

  return { deleteBooking, isDeletingBooking };
}

export { useDeleteBooking };
