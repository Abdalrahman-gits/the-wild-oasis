import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";
import { subDays } from "date-fns";

function useRecentBookings() {
  const [searchParams] = useSearchParams();
  const numDays = searchParams.get("last")
    ? Number(searchParams.get("last"))
    : 7;
  const startDate = subDays(new Date(), numDays).toISOString();

  const { data: recentBookings, isLoading } = useQuery({
    queryKey: ["bookings", `last-${numDays}`],
    queryFn: () => getBookingsAfterDate(startDate),
  });

  return { recentBookings, numDays, isLoading };
}

export { useRecentBookings };
