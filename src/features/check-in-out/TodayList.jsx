import styled from "styled-components";
import TodayItem from "./TodayItem";

const StyledTodayList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

function TodayList({ activities }) {
  if (!activities?.length)
    return <NoActivity>There is no activities right now!</NoActivity>;

  return (
    <StyledTodayList>
      {activities.map((activity) => (
        <TodayItem key={activity?.id} activity={activity} />
      ))}
    </StyledTodayList>
  );
}

export default TodayList;
