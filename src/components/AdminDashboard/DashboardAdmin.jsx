import "./DashboardAdmin.css";
import { FaUserClock } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import PieChartComponent from "../pie chart/PieChartComponent";
import BarChartComponent from "../bar chart/BarChart";
import { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import useStorage from "../../hooks/useStorage";
import adminService from "../../services/adminService";

const DashboardAdmin = () => {
  const [progress, setProgress] = useState([]);
  const [productivity, setProductivity] = useState([]);
  const [risk, setRisk] = useState();
  const [totalLeaders, setTotalLeaders] = useState(0);
  const [totalSum, setTotalSum] = useState(0);
  const [employees, setEmployees] = useState(0);
  const [projectStatus, setProjectStatus] = useState([]);

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
      adminService
        .getProgress()
        .then((response) => {
          if (response.status === 200) {
            const progressData = [
              {
                name: "Completed",
                value: response.data.progressData.completedTasks,
              },
              {
                name: "Pending",
                value: response.data.progressData.pendingTasks,
              },
              {
                name: "Backlogs",
                value: response.data.progressData.overdueTasks,
              },
              {
                name: "In-Progress",
                value: response.data.progressData.inProgressTasks,
              },
            ];
            setProgress(progressData);
          }
        })
        .catch((error) => {
          alert("Some Error occurred");
        });

      adminService
        .getProductivity()
        .then((response) => {
          if (response.status === 200) {
            setProductivity(response.data.productivityData);
          }
        })
        .catch((error) => {
          alert("Some Error occurred");
        });

      adminService
        .getRisk()
        .then((response) => {
          if (response.status === 200) {
            const riskObject = {
              project: response.data.project,
              value: response.data.highestRiskLevel,
            };
            setRisk(riskObject);
          }
        })
        .catch((error) => {
          alert("Some Error occurred");
        });

      adminService
        .getSum()
        .then((response) => {
          if (response.status === 200) {
            setTotalSum(response.data.totalSumInvested);
          }
        })
        .catch((error) => {
          alert("Some Error occurred");
        });

      adminService
        .getUsersCount()
        .then((response) => {
          if (response.status === 200) {
            setEmployees(response.data.employees);
            setTotalLeaders(response.data.teamLeaders);
          }
        })
        .catch((error) => {
          alert("Some Error occurred");
        });

      adminService
        .getProjectStatus()
        .then((response) => {
          if (response.status === 200) {
            setProjectStatus(response.data.progressData);
          }
        })
        .catch((error) => {
          alert("Some Error occurred");
        });
    }
  }, [user]);

  return (
    <div className="adm-container">
      <div className="adm-row">
        <div className="adm-pie adm-col">
          {progress.length > 0 ? (
            <PieChartComponent data={progress} />
          ) : (
            <h3>Some error occurred...</h3>
          )}
        </div>
        <div className="adm-graph adm-col">
          {productivity && productivity.length > 0 ? (
            <BarChartComponent data={productivity} />
          ) : (
            <h3>No tasks completed yet by any user</h3>
          )}
        </div>
        <div className={`adm-col adm-risk`}>
          <p className="risk-title">Risk</p>
          <h1 className="risk-value">{risk && risk.value}%</h1>
          <p className="risk-description">{risk && risk.project.title}</p>
        </div>
      </div>
      <div className="adm-row row-2">
        <div className="adm-col adm-leader">
          <p className="adm-leader-header">Total Team Leaders</p>
          <FaUserTie className="adm-icon" />
          <h1 className="adm-value">{totalLeaders}</h1>
        </div>
        <div className="adm-col adm-employee">
          <p className="adm-employee-header">Total Employees</p>
          <FaUserClock className="adm-icon" />
          <h1 className="adm-value">{employees}</h1>
        </div>
        <div className="adm-col adm-sum">
          <p className="adm-project-header">Total Invested</p>
          <MdAttachMoney className="adm-icon" />
          <h1 className="adm-value">{totalSum}</h1>
        </div>
        <div className="adm-col adm-task">
          <PieChartComponent data={projectStatus} />
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
