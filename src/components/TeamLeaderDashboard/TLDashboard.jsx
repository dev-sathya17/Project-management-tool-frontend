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
        <div className=" tld-col tld-risk">
          <p>Third</p>
        </div>
      </div>
      <div className="tld-row row-2">
        <div className="tld-col tld-task">
          <p>Row 2 first card</p>
        </div>
        <div className="tld-col tld-reports">
          <p>Row 2 2nd card</p>
        </div>
        <div className="tld-col tld-project">
          <p>Row 2 third card</p>
        </div>
        <div className="tld-col tld-box">
          <div className="tld-deadline tld-box-col">
            <p>Row 2 box first</p>
          </div>
          <div className="tld-task-management tld-box-col">
            <p>Row 2 box 2nd</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TLDashboard;
