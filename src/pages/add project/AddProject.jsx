import { useEffect, useState } from "react";
import "./AddProject.css";
import userService from "../../services/userService";
import projectService from "../../services/projectService";
const AddProject = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    member: "",
    budget: "",
    startDate: "",
    endDate: "",
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userService
      .fetchUnassignedUsers()
      .then((response) => {
        if (response.status === 200) {
          setUsers(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    projectService
      .addProject(formData)
      .then((response) => {
        if (response.status === 201) {
          alert("Project added successfully!");
          setFormData({
            title: "",
            description: "",
            member: "",
            budget: "",
            startDate: "",
            endDate: "",
          });
        } else {
          alert("Failed to add project. Please try again.");
        }
      })
      .catch((error) => {
        console.error(error);
      });
    console.log("Form data submitted:", formData);
  };

  return (
    <div className="add-project-container">
      <h1>Add a Project</h1>
      <form onSubmit={handleSubmit} className="add-project-form">
        <div className="add-project-form-group">
          <label htmlFor="title" className="add-project-label">
            Project Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="add-project-input"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="add-project-form-group">
          <label htmlFor="description" className="add-project-label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="add-project-textarea"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="add-project-form-group">
          <label htmlFor="member" className="add-project-label">
            Assigned member
          </label>
          <select
            id="member"
            name="member"
            className="add-project-select"
            value={formData.member}
            onChange={handleChange}
            required
          >
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user.id} value={user._id}>
                {user.firstName} {user.lastName}
              </option>
            ))}
          </select>
        </div>
        <div className="add-project-form-group">
          <label htmlFor="budget" className="add-project-label">
            Budget
          </label>
          <input
            type="number"
            id="budget"
            name="budget"
            className="add-project-input"
            value={formData.budget}
            onChange={handleChange}
            required
          />
        </div>
        <div className="add-project-form-group">
          <label htmlFor="startDate" className="add-project-label">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            className="add-project-input"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="add-project-form-group">
          <label htmlFor="endDate" className="add-project-label">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            className="add-project-input"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="add-project-button">
          Add Project
        </button>
      </form>
    </div>
  );
};

export default AddProject;
