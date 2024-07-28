import { useLoaderData } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import { useUser } from "../../contexts/UserContext";
import Pills from "../../components/pills/Pills";
import "./dashboard.css";
import { GiHamburgerMenu } from "react-icons/gi";
import Logo from "../../components/logo/Logo";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";
import TLDashboard from "../../components/TeamLeaderDashboard/TLDashboard";
import Switch from "../../components/switch/Switch";

const TeamLeaderDashboard = () => {
  const [view, setView] = useState(false);

  const data = useLoaderData();
  const sortedData = data.sort();
  console.log(sortedData);
  const projects = [
    ...sortedData,
    ...sortedData,
    ...sortedData,
    ...sortedData,
    ...sortedData,
    ...sortedData,
    ...sortedData,
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

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-sidebar-desk">
        <Switch />
        <header className="sidebar-header">
          <Logo />
        </header>
        <Sidebar>
          {projects.map((project, index) => (
            <Pills title={project.title} type={project.type} key={index} />
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
            <Sidebar>
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
