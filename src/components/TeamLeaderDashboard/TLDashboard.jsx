import "./TLDashboard.css";
import PieChartComponent from "../pie chart/PieChartComponent";
import BarChartComponent from "../bar chart/BarChart";
import { TbReport } from "react-icons/tb";
import { FaTasks } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
const TLDashboard = () => {
  return (
    <div className="tld-container">
      <div className="tld-row">
        <div className="tld-pie tld-col">
          <PieChartComponent />
        </div>
        <div className="tld-graph tld-col">
          <BarChartComponent />
        </div>
        <div className="tld-col tld-risk">
          <p className="risk-title">Risk Level</p>
          <h1 className="risk-value">45%</h1>
          <p className="risk-level">High</p>
          <p>description</p>
        </div>
      </div>
      <div className="tld-row row-2">
        <div className="tld-col tld-task">
          <p className="task-header">Tasks pending for Today</p>
          <h1 className="task-value">12</h1>
          <p className="task-description">Keep Going!</p>
        </div>
        <div className="tld-col tld-reports">
          <p className="tld-reports-header">View Reports</p>
          <TbReport className="tld-report-icon" />
          <p className="tld-reports-description">
            Have a look at how the team&lsquo;s performing
          </p>
        </div>
        <div className="tld-col tld-project">
          <p className="tld-project-header">Manage Projects</p>
          <FaTasks className="tld-project-icon" />
          <p className="tld-project-description">
            Need to update your project? Here is where you go!
          </p>
        </div>
        <div className="tld-col tld-box">
          <div className="tld-deadline tld-box-col">
            <p className="tld-deadline-header">Pending Duration</p>
            <h2 className="tld-deadline-value">1</h2>
            <p className="tld-deadline-description">
              Yeesh! Not much time pending.
            </p>
          </div>
          <div className="tld-user-management tld-box-col">
            <p className="tld-team-header">Manage Team</p>
            <FaUsers className="tld-team-icon" />
            <p className="tld-deadline-description">
              Here&lsquo;s who all you are working with.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TLDashboard;
