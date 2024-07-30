import html2pdf from "html2pdf.js";
import "./Reports.css";
import { useLoaderData } from "react-router-dom";

// const projectsData = [
//   {
//     id: 1,
//     title: "Project Title 1",
//     description: "This is a project description for Project 1",
//     status: "Active",
//     startDate: "July 26, 2024",
//     endDate: "August 26, 2024",
//     tasks: [
//       {
//         title: "Task 1",
//         priority: "High",
//         description: "Description of Task 1",
//         status: "Completed",
//         deadline: "August 1, 2024",
//         assignedTo: { name: "John Doe", profilePic: "path/to/profile1.jpg" },
//       },
//       // Add more tasks as needed
//     ],
//   },
//   // Add more projects as needed
// ];

const ProjectReport = ({ project }) => {
  const printReport = () => {
    const element = document.getElementById(`printable-area-${project.id}`);
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = element.innerHTML;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  const downloadReport = () => {
    const element = document.getElementById(`printable-area-${project.id}`);
    html2pdf().from(element).save(`project_report_${project.id}.pdf`);
  };

  return (
    <div className="project-report-container">
      <div id={`printable-area-${project.id}`} className="printable-area">
        <h2>{project.title}</h2>
        <p>
          <strong>Description:</strong> {project.description}
        </p>
        <p>
          <strong>Status:</strong> {project.status}
        </p>
        <p>
          <strong>Start Date:</strong>{" "}
          {new Date(project.startDate).toLocaleDateString()}
        </p>
        <p>
          <strong>End Date:</strong>{" "}
          {new Date(project.endDate).toLocaleDateString()}
        </p>
        <div className="tasks-list">
          <h3>Tasks:</h3>
          {project.tasks.map((task, index) => (
            <div key={index} className="task">
              <h4>{task.title}</h4>
              <p>
                <strong>Priority:</strong> {task.priority}
              </p>
              <p>
                <strong>Description:</strong> {task.description}
              </p>
              <p>
                <strong>Status:</strong> {task.status}
              </p>
              <p>
                <strong>Deadline:</strong>{" "}
                {new Date(task.deadline).toLocaleDateString()}
              </p>
              <div className="assigned-to">
                <img
                  src={task.assignedTo.image}
                  alt={task.assignedTo.firstName}
                  className="profile-pic"
                />
                <p>
                  <strong>Assigned to:</strong> {task.assignedTo.firstName}{" "}
                  {task.assignedTo.lastName}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="button-container">
        <button onClick={printReport} className="btn-print">
          Print Report
        </button>
        <button onClick={downloadReport} className="btn-download">
          Download Report
        </button>
      </div>
    </div>
  );
};

const ReportDashboard = () => {
  const { projects } = useLoaderData();

  return (
    <div className="report-dashboard">
      {projects.map((project) => (
        <div key={project.id} className="project-container">
          <ProjectReport project={project} />
        </div>
      ))}
    </div>
  );
};

export default ReportDashboard;
