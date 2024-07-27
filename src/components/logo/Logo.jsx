import { PiChartLineUpBold } from "react-icons/pi";
import "./Logo.css";
const Logo = () => {
  return (
    <>
      <PiChartLineUpBold className="logo" />
      <h2 className="brand-title">
        <span className="brand-emphasis">Pro</span>-Manager
      </h2>
    </>
  );
};

export default Logo;
