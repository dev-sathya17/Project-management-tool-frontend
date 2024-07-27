import { useLoaderData } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import { useUser } from "../../contexts/UserContext";
import Pills from "../../components/pills/Pills";

const TeamLeaderDashboard = () => {
  const data = useLoaderData();

  const projects = [
    ...data,
    ...data,
    ...data,
    ...data,
    ...data,
    ...data,
    ...data,
    { title: "Add a new project", type: "add" },
  ];

  const { user } = useUser();
  console.log(user);
  return (
    <div className="container">
      <Sidebar>
        {projects.map((project, index) => (
          <Pills
            index={index + 1}
            title={project.title}
            type={project.type}
            key={index}
          />
        ))}
      </Sidebar>
    </div>
  );
};

export default TeamLeaderDashboard;
