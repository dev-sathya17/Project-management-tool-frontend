import { useTheme } from "../../contexts/ThemeContext";
import "./Switch.css";

const Switch = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <button onClick={toggleTheme} className="switch">
        Switch to {theme === "light" ? "dark" : "light"} mode
      </button>
    </>
  );
};

export default Switch;
