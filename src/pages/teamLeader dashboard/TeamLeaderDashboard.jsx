import { useLoaderData, useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import { useUser } from "../../contexts/UserContext";
import Pills from "../../components/pills/Pills";
import "./dashboard.css";
import { GiHamburgerMenu } from "react-icons/gi";
import Logo from "../../components/logo/Logo";
import { RxCross1 } from "react-icons/rx";
import { useEffect, useState } from "react";
import TLDashboard from "../../components/TeamLeaderDashboard/TLDashboard";
import { FaBell } from "react-icons/fa6";
import NotificationPanel from "../../components/notifications/NotificationPanel";
import userService from "../../services/userService";
import useStorage from "../../hooks/useStorage";

const TeamLeaderDashboard = () => {
  const data = useLoaderData();

  const [view, setView] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [project, setProject] = useState(data[0]);
  const navigate = useNavigate();

  const { user, setUser } = useUser();
  const { getValueFromStorage, removeValueFromStorage } = useStorage();

  if (!user) {
    const storedUser = getValueFromStorage("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }

  const handleToggle = () => {
    setView(!view);
  };

  const handleToggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleProfileView = () => {
    navigate(`/auth/profile`);
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

  const handleSelectProject = (project) => {
    setProject(project);
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
          {data.map((project, index) => (
            <Pills
              project={project}
              type={project.type}
              key={index}
              handleClick={handleSelectProject}
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
              {data.map((project, index) => (
                <Pills
                  project={project}
                  type={project.type}
                  key={index}
                  handleClick={handleSelectProject}
                />
              ))}
            </Sidebar>
          </div>
        )}
      </div>

      <main className="dashboard-container">
        <TLDashboard />
      </main>
    </div>
  );
};

export default TeamLeaderDashboard;
