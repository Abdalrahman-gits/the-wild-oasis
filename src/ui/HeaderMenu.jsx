import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import Logout from "../features/authentication/Logout";
import { HiOutlineUser } from "react-icons/hi2";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

function HeaderMenu() {
  return (
    <StyledHeaderMenu>
      <ButtonIcon>
        <HiOutlineUser />
      </ButtonIcon>
      <Logout />
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
