import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, cabinCount, numDays }) {
  // 1) number of bookings
  const numBookings = bookings.length;

  // 2) sales
  const sales = bookings.reduce((acc, book) => acc + book.totalPrice, 0);

  // 3) number of check ins
  const checkins = confirmedStays.length;

  // 4) occupation rate
  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (cabinCount * numDays);
  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + "%"}
      />
    </>
  );
}

export default Stats;
