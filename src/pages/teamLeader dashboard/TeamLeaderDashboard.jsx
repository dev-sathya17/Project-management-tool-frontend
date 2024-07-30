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
import userService from "../../services/userService";
import useStorage from "../../hooks/useStorage";

const TeamLeaderDashboard = () => {
  const { projects } = useLoaderData();

  const [view, setView] = useState(false);
  const [project, setProject] = useState(projects[0]);
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

  const handleProfileView = () => {
    navigate(`/leader/profile`);
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

  const addProject = () => {
    navigate(`/leader/add-project`);
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
          {projects.map((project, index) => (
            <Pills
              data={project}
              type={"projects"}
              key={index}
              handleClick={handleSelectProject}
            />
          ))}
          <Pills type={"add"} handleClick={addProject} />
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
              {projects.map((project, index) => (
                <Pills
                  data={project}
                  type={"projects"}
                  key={index}
                  handleClick={handleSelectProject}
                />
              ))}
              <Pills type={"add"} handleClick={addProject} />
            </Sidebar>
          </div>
        )}
      </div>

      <main className="dashboard-container">
        {project && <TLDashboard project={project} />}
      </main>
    </div>
  );
};

export default TeamLeaderDashboard;
