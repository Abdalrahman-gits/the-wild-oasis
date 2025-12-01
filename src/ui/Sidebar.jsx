import styled from "styled-components";
import Logo from "../ui/Logo";
import MainNav from "../ui/MainNav";

const StyledAside = styled.aside`
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);

  grid-area: 1 / 1 / -1 / 2;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function Sidebar() {
  return (
    <StyledAside>
      <Logo />
      <MainNav />
    </StyledAside>
  );
}

export default Sidebar;
