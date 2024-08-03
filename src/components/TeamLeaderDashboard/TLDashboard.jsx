import "./TLDashboard.css";
import PieChartComponent from "../pie chart/PieChartComponent";
import BarChartComponent from "../bar chart/BarChart";
import { TbReport } from "react-icons/tb";
import { FaTasks } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { useEffect, useState } from "react";
import projectService from "../../services/projectService";
import { Link } from "react-router-dom";
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
        alert("Some Error occurred");
      });
    projectService
      .getPendingTasks(project._id)
      .then((response) => {
        if (response.status === 200) {
          setTasks(response.data.count);
        }
      })
      .catch((error) => {
        alert("Some Error occurred");
      });
    projectService
      .getProjectProductivity(project._id)
      .then((response) => {
        if (response.status === 200) {
          setProductivity(response.data.productivityData);
        }
      })
      .catch((error) => {
        alert("Some Error occurred");
      });
    projectService
      .getProjectPendingDuration(project._id)
      .then((response) => {
        if (response.status === 200) {
          setDuration(response.data.duration);
        }
      })
      .catch((error) => {
        alert("Some Error occurred");
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
        alert("Some Error occurred");
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
            {risks.percentage > 90
              ? "Project is at high risk of incompletion"
              : risks.percentage > 80
              ? "Very urgent attention required else project won't be achievable."
              : risks.percentage > 60
              ? "Urgent attention required."
              : risks.percentage > 40
              ? "The project needs attention in certain areas to improve future risks."
              : "The project is performing well."}
          </p>
        </div>
      </div>
      <div className="tld-row row-2">
        <div className="tld-col tld-task">
          <p className="task-header">Tasks pending for Today</p>
          <h1 className="task-value">{tasks}</h1>
          <p className="task-description">
            {tasks === 0
              ? "Today is a free day!"
              : tasks <= 5
              ? "You got some work to do today"
              : "Today's gonna be a very hardworking day"}
          </p>
        </div>
        <div className="tld-col tld-reports">
          <p className="tld-reports-header">View Reports</p>
          <TbReport className="tld-report-icon" />
          <Link className="tld-project-description" to={`/leader/reports`}>
            <p className="tld-reports-description">
              Have a look at how the team&lsquo;s performing
            </p>
          </Link>
        </div>
        <div className="tld-col tld-project">
          <p className="tld-project-header">Manage Projects</p>
          <FaTasks className="tld-project-icon" />
          <Link className="tld-project-description" to={`/leader/projects`}>
            <p className="tld-project-description">
              Need to update your project? Here is where you go!
            </p>
          </Link>
        </div>
        <div className="tld-col tld-box">
          <div className="tld-deadline tld-box-col">
            <p className="tld-deadline-header">Pending Duration</p>
            <h2 className="tld-deadline-value">
              {duration && duration.toFixed(2)} month(s)
            </h2>
            <p className="tld-deadline-description">
              {duration && duration.toFixed(2) < 1
                ? "Yeesh! Not much time pending."
                : "Keep going!"}
            </p>
          </div>
          <div className="tld-user-management tld-box-col">
            <p className="tld-team-header">Manage Team</p>
            <FaUsers className="tld-team-icon" />
            <p className="tld-team-description">
              <Link
                className="tld-team-description"
                to={`/leader/${project._id}/manage-team`}
              >
                Here&lsquo;s everyone you are working with
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TLDashboard;
