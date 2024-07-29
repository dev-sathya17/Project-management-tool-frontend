import { useNavigate } from "react-router-dom";
import Logo from "../../components/logo/Logo";
import Sidebar from "../../components/sidebar/Sidebar";
import userService from "../../services/userService";
import { useUser } from "../../contexts/UserContext";
import useStorage from "../../hooks/useStorage";
import NotificationPanel from "../../components/notifications/NotificationPanel";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { FaBell } from "react-icons/fa6";
import { useState } from "react";
import Pills from "./../../components/pills/Pills";
import DashboardEmployee from "../../components/EmployeeDashboard/DashboardEmployee";
import Workspace from "../../components/workspace/Workspace";

const EmployeeDashboard = () => {
  const [view, setView] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [page, setPage] = useState("Dashboard");
  const navigate = useNavigate();

  const { user, setUser } = useUser();
  const { getValueFromStorage, removeValueFromStorage } = useStorage();

  const pills = [
    {
      title: "Dashboard",
    },
    {
      title: "Workspace",
    },
  ];

  if (!user) {
    const storedUser = getValueFromStorage("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }

  const handlePage = (page) => {
    setPage(page);
  };

  const handleToggle = () => {
    setView(!view);
  };

  const handleToggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleProfileView = () => {
    navigate(`/employee/profile`);
  };

  const handleLogout = () => {
    const choice = confirm("Are you sure you want to log out");
    if (choice) {
      userService
        .logout()
        .then((response) => {
          console.log(response.data);
          if (response.status === 200) {
            alert("Logged out successfully");
            removeValueFromStorage("user");
            navigate("/login");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-sidebar-desk">
        <header className="sidebar-header">
          <Logo />
          <FaBell className="bell-icon" onClick={handleToggleNotifications} />
          {showNotifications && <NotificationPanel />}
        </header>
        <Sidebar
          handleClick={handleLogout}
          handleProfileView={handleProfileView}
        >
          {pills.map((pill, index) => (
            <Pills
              data={pill}
              type={pill.type}
              key={index}
              handleClick={handlePage}
              page={pill.title}
            />
          ))}
        </Sidebar>
      </div>
      <div className="dashboard-sidebar-mob">
        <div className="nav-mobile">
          <Logo />
          <FaBell className="bell-icon" onClick={handleToggleNotifications} />
          {showNotifications && <NotificationPanel />}
          {view ? (
            <RxCross1 onClick={handleToggle} />
          ) : (
            <GiHamburgerMenu onClick={handleToggle} className="ham-menu" />
          )}
        </div>
        {view && (
          <div className="scroll-sidebar">
            <Sidebar
              handleClick={handleLogout}
              handleProfileView={handleProfileView}
            >
              {pills.map((pill, index) => (
                <Pills
                  data={pill}
                  type={pill.type}
                  key={index}
                  handleClick={handlePage}
                  page={pill.title}
                />
              ))}
            </Sidebar>
          </div>
        )}
      </div>

      <main className="dashboard-container">
        {page === "Dashboard" ? <DashboardEmployee /> : <Workspace />}
      </main>
    </div>
  );
};

export default EmployeeDashboard;
