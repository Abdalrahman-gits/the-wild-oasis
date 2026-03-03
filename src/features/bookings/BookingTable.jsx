import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import { useBookings } from "./useBookings";
import Pagination from "../../ui/Pagination";
import { useSearchParams } from "react-router-dom";

function BookingTable() {
  const { bookings, isLoading } = useBookings();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  if (!bookings?.length) return <Empty resourceName="bookings" />;

  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const currentBookings = bookings.slice((page - 1) * 10, page * 10);

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={currentBookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
        <Table.Footer>
          <Pagination count={bookings.length} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
