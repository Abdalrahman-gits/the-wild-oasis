import styled from "styled-components";

import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import { useTodayActivity } from "./useTodayActivity";
import Spinner from "../../ui/Spinner";
import TodayList from "./TodayList";

const StyledToday = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / -1;
  padding-top: 2.4rem;

  @media (min-width: 1200px) {
    grid-column: 1 / span 2;
  }
`;

function TodayActivity() {
  const { activities, isLoading } = useTodayActivity();
  return (
    <StyledToday>
      <Row type="horizontal">
        <Heading as="h2">Today</Heading>
      </Row>
      {!isLoading ? <TodayList activities={activities} /> : <Spinner />}
    </StyledToday>
  );
}

export default TodayActivity;
