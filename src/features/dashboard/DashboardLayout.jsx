import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import { useCabins } from "../cabins/useCabins";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const {
    recentBookings,
    numDays,
    isLoading: loadingBookings,
  } = useRecentBookings();
  console.log(recentBookings);
  const { confirmedStays, isLoading: loadingStays } = useRecentStays();
  const { cabins, isLoading: loadingCabins } = useCabins();

  if (loadingBookings || loadingStays || loadingCabins) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={recentBookings}
        confirmedStays={confirmedStays}
        cabinCount={cabins?.length}
        numDays={numDays}
      />
      <div>Today&apos;s activity</div>
      <div>Chart stay duration</div>
      <div>Chart sales</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
