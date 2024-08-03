import { useTheme } from "../../contexts/ThemeContext";
import useStorage from "../../hooks/useStorage";
import "./Switch.css";
import { IoMoon } from "react-icons/io5";
import { IoSunnyOutline } from "react-icons/io5";

const Switch = () => {
  const { theme, toggleTheme } = useTheme();
  const { getValueFromStorage } = useStorage();

  if (!theme) {
    const storedTheme = getValueFromStorage("theme");
    if (storedTheme) {
      toggleTheme();
    }
  }

  return (
    <>
      <button onClick={toggleTheme} className="switch">
        {theme === "light" ? <IoMoon /> : <IoSunnyOutline />}
      </button>
    </>
  );
};

export default Switch;
