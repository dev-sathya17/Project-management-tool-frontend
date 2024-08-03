import { Outlet, useNavigate } from "react-router-dom";
import Logo from "../../components/logo/Logo";
import Sidebar from "../../components/sidebar/Sidebar";
import userService from "../../services/userService";
import { useUser } from "../../contexts/UserContext";
import useStorage from "../../hooks/useStorage";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { FaBell } from "react-icons/fa6";
import { useState } from "react";
import Pills from "./../../components/pills/Pills";

const EmployeeDashboard = () => {
  const [view, setView] = useState(false);
  const navigate = useNavigate();

  const { user, setUser } = useUser();
  const { getValueFromStorage, removeValueFromStorage } = useStorage();

  const pills = [
    {
      title: "dashboard",
    },
    {
      title: "workspace",
    },
  ];

  if (!user) {
    const storedUser = getValueFromStorage("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }

  const handleToggle = () => {
    setView(!view);
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
          if (response.status === 200) {
            alert("Logged out successfully");
            removeValueFromStorage("user");
            navigate("/login");
          }
        })
        .catch((error) => {
          alert("Some Error occurred");
        });
    }
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-sidebar-desk">
        <header className="sidebar-header">
          <Logo />
        </header>
        <Sidebar
          handleClick={handleLogout}
          handleProfileView={handleProfileView}
        >
          {pills.map((pill, index) => (
            <Pills data={pill} type={pill.type} key={index} page={pill.title} />
          ))}
        </Sidebar>
      </div>
      <div className="dashboard-sidebar-mob">
        <div className="nav-mobile">
          <Logo />
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
                  page={pill.title}
                />
              ))}
            </Sidebar>
          </div>
        )}
      </div>

      <main className="dashboard-container">
        <Outlet />
      </main>
    </div>
  );
};

export default EmployeeDashboard;
