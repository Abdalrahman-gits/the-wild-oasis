import styled from "styled-components";
import Sidebar from "./Sidebar";

const StyledDesktopSidebar = styled.div`
  display: none;

  @media (min-width: 991px) {
    display: grid;
    grid-area: 1 / 1 / -1 / 2;
  }
`;

function DesktopSidebar() {
  return (
    <StyledDesktopSidebar>
      <Sidebar />
    </StyledDesktopSidebar>
  );
}

export default DesktopSidebar;
