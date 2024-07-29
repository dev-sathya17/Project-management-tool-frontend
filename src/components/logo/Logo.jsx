import { PiChartLineUpBold } from "react-icons/pi";
import LogoImage from "../../assets/Pro-Manager.png";
import "./Logo.css";
const Logo = () => {
  return (
    <div className="logo-container">
      <PiChartLineUpBold className="logo" />
      <img src={LogoImage} alt="logo" className="logo-img" />
    </div>
  );
};

export default Logo;
