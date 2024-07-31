import { useState } from "react";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import { MdMoreHoriz } from "react-icons/md";
// import { FaInfo } from "react-icons/fa6";
import "./ManageProjects.css";
import { Link, useLoaderData } from "react-router-dom";

const ManageProjects = () => {
  const { projects } = useLoaderData();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredProjects = projects
    .filter((project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (project) => statusFilter === "all" || project.status === statusFilter
    );

  return (
    <div className="project-manager">
      <div className="search-filter-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="status-filters">
          <label htmlFor="status">Filter by status:</label>
          <select
            id="status"
            className="status-dropdown"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
      <div className="project-list">
        {filteredProjects.map((project) => (
          <div className="project-item" key={project.id}>
            <h3>{project.title}</h3>
            <p>Status: {project.status}</p>
            <p>Description: {project.description}</p>
            <p>
              Start Date: {new Date(project.startDate).toLocaleDateString()}
            </p>
            <p>Budget: ${project.budget}</p>
            <p>Deadline: {new Date(project.endDate).toLocaleDateString()}</p>
            <div className="members">
              {project.members.map((member, index) => (
                <img
                  key={index}
                  src={
                    member.image
                      ? `https://project-management-tool-backend-wzfm.onrender.com/${member.image}`
                      : "https://img.freepik.com/premium-photo/graphic-designer-digital-avatar-generative-ai_934475-9292.jpg"
                  }
                  alt={member.firstName}
                  className="member-image"
                />
              ))}
            </div>
            <button className="project-view-btn">
              <Link className="nav-link" to={`/leader/projects/${project._id}`}>
                View {project.title}
              </Link>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageProjects;
