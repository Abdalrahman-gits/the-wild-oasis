import ButtonIcon from "./ButtonIcon";
import { useDarkMode } from "../context/DarkModeContext";
import { HiOutlineMoon, HiSun } from "react-icons/hi2";

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {!isDarkMode ? <HiOutlineMoon /> : <HiSun />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
