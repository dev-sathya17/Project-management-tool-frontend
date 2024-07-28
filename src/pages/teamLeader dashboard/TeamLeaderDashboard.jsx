import { useLoaderData, useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import { useUser } from "../../contexts/UserContext";
import Pills from "../../components/pills/Pills";
import "./dashboard.css";
import { GiHamburgerMenu } from "react-icons/gi";
import Logo from "../../components/logo/Logo";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";
import TLDashboard from "../../components/TeamLeaderDashboard/TLDashboard";
import { FaBell } from "react-icons/fa6";
import NotificationPanel from "../../components/notifications/NotificationPanel";
import userService from "../../services/userService";

const TeamLeaderDashboard = () => {
  const [view, setView] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const data = useLoaderData();

  const projects = [
    ...data,
    ...data,
    ...data,
    ...data,
    ...data,
    ...data,
    ...data,
    { title: "Add project", type: "add" },
  ];

  const cardData = {
    title: "Risk Percentage",
    description: "59%",
  };

  const { user } = useUser();
  console.log(user);

  const handleToggle = () => {
    setView(!view);
  };

  const handleToggleNotifications = () => {
    setShowNotifications(!showNotifications);
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
        <Sidebar handleClick={handleLogout}>
          {projects.map((project, index) => (
            <Pills title={project.title} type={project.type} key={index} />
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
            <Sidebar handleClick={handleLogout}>
              {projects.map((project, index) => (
                <Pills title={project.title} type={project.type} key={index} />
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
