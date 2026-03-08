import styled from "styled-components";
import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";
import CheckoutButton from "./CheckoutButton";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ activity }) {
  const {
    id,
    status,
    numNights,
    guests: { fullName, countryFlag },
  } = activity;

  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">departing</Tag>}
      <Flag src={countryFlag} alt={`country flag of ${fullName}`} />
      <Guest>{fullName}</Guest>
      <div>{numNights}-nights</div>

      {status === "unconfirmed" && (
        <Button size="small" as={Link} to={`/checkin/${id}`}>
          Check in
        </Button>
      )}
      {status === "checked-in" && <CheckoutButton bookingId={id} />}
    </StyledTodayItem>
  );
}

export default TodayItem;
// id: 28
// created_at: "2026-02-16T03:23:54.085+00:00"
// startDate: "2026-03-08T00:00:00"
// endDate: "2026-03-15T00:00:00"
// numGuests: 1
// numNights: 7
// cabinPrice: 1750
// extrasPrice: 105
// totalPrice: 1855
// status: "unconfirmed"
// hasBreakfast: true
// isPaid: false
// cabinId: 72
// guestId: 6
// observations: "I have a gluten allergy and would like to request a gluten-free breakfast."
//  guests 3 items
// fullName: "Abdo Ghozal"
// countryFlag: "https://flagcdn.com/ar.svg"
// nationality: "Argentina"
