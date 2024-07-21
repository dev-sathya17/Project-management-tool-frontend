import { FaBell } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import { PiKanbanFill } from "react-icons/pi";
import { MdOutlineSecurity } from "react-icons/md";
import { IoBarChart } from "react-icons/io5";
import { TbReport } from "react-icons/tb";
import "./FeatureCard.css";

const FeatureCard = ({ feature, index }) => {
  const icons = {
    alarm: <FaBell />,
    success: <FaRegCheckCircle />,
    kanban: <PiKanbanFill />,
    risk: <MdOutlineSecurity />,
    charts: <IoBarChart />,
    report: <TbReport />,
  };

  return (
    <div className="feature-card">
      <div className="feature-icon">{Object.values(icons)[index]}</div>
      <p className="text">{feature.text}</p>
    </div>
  );
};

export default FeatureCard;
