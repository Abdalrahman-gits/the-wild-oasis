import styled from "styled-components";
import Sidebar from "./Sidebar";
import { useSidebar } from "../context/SidebarContext";
import { createPortal } from "react-dom";
import ButtonIcon from "./ButtonIcon";
import { HiX } from "react-icons/hi";

const StyledMobileSidebar = styled.div`
  display: grid;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 26rem;
  z-index: 100;
  transform: translateX(-100%);
  transition: 0.3s;

  ${({ isOpen }) =>
    !isOpen
      ? "transform: translateX(-100%); visibility: hidden;"
      : "transform: translateX(0); visibility: visible;"}

  @media (min-width: 991px) {
    display: none;
  }
`;

const Overlay = styled.div`
  display: block;
  position: fixed;
  inset: 0;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 99;

  @media (min-width: 991px) {
    display: none;
  }
`;

const CloseButton = styled(ButtonIcon)`
  position: absolute;
  right: 1rem;
  top: 2rem;
`;

function MobileSidebar() {
  const { isOpen, close } = useSidebar();

  return createPortal(
    <>
      {isOpen && <Overlay onClick={close} />}
      <StyledMobileSidebar isOpen={isOpen}>
        <CloseButton onClick={close}>
          <HiX />
        </CloseButton>
        <Sidebar />
      </StyledMobileSidebar>
    </>,
    document.body,
  );
}

export default MobileSidebar;
