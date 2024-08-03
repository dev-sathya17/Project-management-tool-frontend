import "./DashboardEmployee.css";
import PieChartComponent from "../pie chart/PieChartComponent";
import BarChartComponent from "../bar chart/BarChart";
import { FaUsers } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { FaHourglass } from "react-icons/fa6";
import userService from "../../services/userService";
import { useUser } from "../../contexts/UserContext";
import useStorage from "../../hooks/useStorage";
import projectService from "../../services/projectService";
import { Link } from "react-router-dom";

const DashboardEmployee = () => {
  const [duration, setDuration] = useState("");
  const [progress, setProgress] = useState([]);
  const [productivity, setProductivity] = useState([]);
  const [performance, setPerformance] = useState([]);
  const [tasks, setTasks] = useState(0);
  const { user, setUser } = useUser();

  const { getValueFromStorage } = useStorage();

  useEffect(() => {
    if (!user) {
      const storedUser = getValueFromStorage("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, [user, getValueFromStorage, setUser]);

  useEffect(() => {
    if (user) {
      userService
        .fetchProgress(user._id)
        .then((response) => {
          if (response.status === 200) {
            const progressData = [
              {
                name: "Completed",
                value: response.data.statusCounts.Completed,
              },
              {
                name: "Pending",
                value: response.data.statusCounts.Idle,
              },
              {
                name: "Backlogs",
                value: response.data.statusCounts.Backlogs,
              },
              {
                name: "In-Progress",
                value: response.data.statusCounts.Pending,
              },
            ];
            setProgress(progressData);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      userService
        .fetchPendingTasks(user._id)
        .then((response) => {
          if (response.status === 200) {
            setTasks(response.data.totalTasksPendingToday);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      if (user.assignedTo) {
        projectService
          .getProjectPendingDuration(user.assignedTo)
          .then((response) => {
            if (response.status === 200) {
              setDuration(response.data.duration);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        setDuration(null);
      }
      userService
        .fetchProductivity(user._id)
        .then((response) => {
          if (response.status === 200) {
            setProductivity(response.data.productivityData);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      userService
        .fetchPerformance(user._id)
        .then((response) => {
          if (response.status === 200) {
            setPerformance(response.data.performancePercentage);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  const getPerformanceLevel = () => {
    let performanceLevel = "";
    if (performance >= 90) {
      performanceLevel = "performance-best";
    } else if (performance >= 60 && performance <= 90) {
      performanceLevel = "performance-good";
    } else if (performance >= 40 && performance <= 60) {
      performanceLevel = "performance-mid";
    } else {
      performanceLevel = "performance-bad";
    }

    return performanceLevel;
  };

  return (
    <div className="emp-container">
      <div className="emp-row">
        <div className="emp-pie emp-col">
          {progress && progress.length > 0 ? (
            <PieChartComponent data={progress} />
          ) : (
            <h3>No tasks are assigned to you</h3>
          )}
        </div>
        <div className="emp-graph emp-col">
          {productivity && productivity.length > 0 ? (
            <BarChartComponent data={productivity} />
          ) : (
            <h3>No tasks added to this project</h3>
          )}
        </div>
        <div className={`emp-col emp-performance ${getPerformanceLevel()}`}>
          <p className="performance-title">Performance</p>
          <h1 className="performance-value">{performance || 0}%</h1>
          <p className="performance-description">
            {performance === 100
              ? "Your Performance is mesmerizing!"
              : performance < 80
              ? "You are doing great keep it up."
              : performance < 60
              ? "You are doing good! Keep it up."
              : performance < 40
              ? "You are doing good! But you got to pick up the pace."
              : "You need to improve. Don't be disappointed."}
          </p>
        </div>
      </div>
      <div className="emp-row row-2">
        <div className="emp-col emp-task">
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
        <div className="emp-col emp-duration">
          <p className="emp-duration-header">
            <span>
              <FaHourglass className="emp-duration-icon" />{" "}
            </span>{" "}
            Pending Duration
          </p>
          <h3 className="emp-duration-value">
            {duration
              ? `${duration.toFixed(2)} month(s)`
              : "You are not assigned yet."}{" "}
          </h3>
          <p className="emp-duration-description">
            {duration && duration.toFixed(2) < 1
              ? "Yeesh! Not much time pending."
              : "Keep going!"}
          </p>
        </div>
        <div className="emp-col emp-team">
          <p className="emp-team-header">View Team</p>
          <FaUsers className="emp-team-icon" />
          <Link className="emp-team-description" to="/employee/team">
            Here&lsquo;s everyone you are working with
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardEmployee;
