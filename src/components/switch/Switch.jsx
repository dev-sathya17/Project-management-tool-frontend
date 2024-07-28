import { useTheme } from "../../contexts/ThemeContext";
import "./Switch.css";
import { IoMoon } from "react-icons/io5";
import { IoSunnyOutline } from "react-icons/io5";

const Switch = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <button onClick={toggleTheme} className="switch">
        {theme === "light" ? <IoMoon /> : <IoSunnyOutline />}
      </button>
    </>
  );
};

export default Switch;
