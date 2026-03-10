import BookingTable from "../features/bookings/BookingTable";
import Heading from "../ui/Heading";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
import PageHeader from "../ui/PageHeader";

function Bookings() {
  return (
    <>
      <PageHeader>
        <Heading as="h1">All bookings</Heading>
        <BookingTableOperations />
      </PageHeader>
      <BookingTable />
    </>
  );
}

export default Bookings;
