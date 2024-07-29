import "./TLDashboard.css";
import PieChartComponent from "../pie chart/PieChartComponent";
import BarChartComponent from "../bar chart/BarChart";
import { TbReport } from "react-icons/tb";
import { FaTasks } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { useEffect, useState } from "react";
import projectService from "../../services/projectService";
const TLDashboard = ({ project }) => {
  const [progress, setProgress] = useState([]);
  const [productivity, setProductivity] = useState([]);
  const [risks, setRisks] = useState({});
  const [duration, setDuration] = useState();
  const [tasks, setTasks] = useState(0);
  useEffect(() => {
    projectService
      .getProjectProgress(project._id)
      .then((response) => {
        if (response.status === 200) {
          const progressData = [
            {
              name: "Completed",
              value: response.data.completed,
            },
            {
              name: "Pending",
              value: response.data.idle,
            },
            {
              name: "Backlogs",
              value: response.data.backlogs,
            },
            {
              name: "In-Progress",
              value: response.data.pending,
            },
          ];
          if (project.tasks.length > 0) {
            setProgress(progressData);
          } else {
            setProgress([]);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
    projectService
      .getPendingTasks(project._id)
      .then((response) => {
        if (response.status === 200) {
          setTasks(response.data.count);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    projectService
      .getProjectProductivity(project._id)
      .then((response) => {
        if (response.status === 200) {
          setProductivity(response.data.productivityData);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    projectService
      .getProjectPendingDuration(project._id)
      .then((response) => {
        if (response.status === 200) {
          setDuration(response.data.duration);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    projectService
      .getProjectRisks(project._id)
      .then((response) => {
        if (response.status === 200) {
          const risks = response.data.risk.filter(
            (risk) => risk.percentage !== 0
          );
          setRisks(risks);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [project]);

  return (
    <div className="tld-container">
      <div className="tld-row">
        <div className="tld-pie tld-col">
          {progress && progress.length > 0 ? (
            <PieChartComponent data={progress} />
          ) : (
            <h3>No tasks added to this project</h3>
          )}
        </div>
        <div className="tld-graph tld-col">
          {productivity && productivity.length > 0 ? (
            <BarChartComponent data={productivity} />
          ) : (
            <h3>No tasks added to this project</h3>
          )}
        </div>
        <div
          className={`tld-col tld-risk ${
            risks.impact === "low"
              ? "risk-low"
              : risks.impact === "medium"
              ? "risk-medium"
              : risks.impact === "high"
              ? "risk-high"
              : ""
          }`}
        >
          <p className="risk-title">Risk Level</p>
          <h1 className="risk-value">{risks.percentage || 0}</h1>
          <p className="risk-level">{risks.impact || "None"}</p>
          <p className="risk-description">
            {risks.description || "Wohooo, Your project is progressing well!"}
          </p>
        </div>
      </div>
      <div className="tld-row row-2">
        <div className="tld-col tld-task">
          <p className="task-header">Tasks pending for Today</p>
          <h1 className="task-value">{tasks}</h1>
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
            <h2 className="tld-deadline-value">
              {duration && duration.toFixed(2)} month(s)
            </h2>
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
