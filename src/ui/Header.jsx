import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";
import ButtonIcon from "./ButtonIcon";
import { HiMenu } from "react-icons/hi";
import { useSidebar } from "../context/SidebarContext";

const StyledHeader = styled.header`
  padding: 1.2rem 1.2rem;
  background-color: var(--color-grey-0);
  border-bottom: 1px solid var(--color-grey-100);

  display: flex;
  justify-content: space-between;
  align-items: center;

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2.4rem;
  }

  @media (min-width: 991px) {
    justify-content: flex-end;
    padding: 1.2rem 4.8rem;
  }
`;

const StyledMenuButton = styled(ButtonIcon)`
  @media (min-width: 991px) {
    display: none;
  }
`;

function Header() {
  const { toggle } = useSidebar();

  return (
    <StyledHeader>
      <StyledMenuButton onClick={toggle}>
        <HiMenu />
      </StyledMenuButton>
      <div>
        <UserAvatar />
        <HeaderMenu />
      </div>
    </StyledHeader>
  );
}

export default Header;
