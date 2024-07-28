import "./TLDashboard.css";
import PieChartComponent from "../pie chart/PieChartComponent";
import BarChartComponent from "../bar chart/BarChart";
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
        <div className=" tld-col tld-risk"></div>
      </div>
      <div className="tld-row row-2">
        <div className="tld-col tld-task"></div>
        <div className="tld-col tld-reports"></div>
        <div className="tld-col tld-project"></div>
        <div className="tld-col tld-box">
          <div className="tld-deadline tld-box-col"></div>
          <div className="tld-task-management tld-box-col"></div>
        </div>
      </div>
    </div>
  );
};

export default TLDashboard;
