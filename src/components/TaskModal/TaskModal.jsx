import { useEffect, useState } from "react";
import "./TaskModal.css";
import { FaRegCalendarAlt, FaTasks } from "react-icons/fa";
import userService from "../../services/userService";
const TaskModal = ({ task, closeModal, type, addTask }) => {
  const [unassignedUsers, setUnassignedUsers] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    deadline: "",
    priority: "low",
    assignedTo: "",
  });

  useEffect(() => {
    userService
      .fetchTaskUnassignedUsers()
      .then((response) => {
        setUnassignedUsers(response.data);
        if (response.data.length === 1) {
          setNewTask({ ...newTask, assignedTo: response.data[0]._id });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (type === "add") {
    return (
      <div className="task-modal-overlay" onClick={closeModal}>
        <div
          className="task-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="task-modal-header">
            <input
              type="text"
              value={newTask.title}
              placeholder="Title:"
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
            />
            <button className="task-modal-close" onClick={closeModal}>
              &times;
            </button>
          </div>
          <div className="task-modal-body">
            <div className="task-modal-section">
              <input
                type="text"
                value={newTask.description}
                placeholder="Description:"
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
              />
            </div>
            <div className="task-modal-section">
              <label htmlFor="members">Users:</label>
              <select
                id="members"
                value={newTask.assignedTo}
                onChange={(e) => {
                  setNewTask({ ...newTask, assignedTo: e.target.value });
                }}
              >
                {unassignedUsers.map((user, index) => (
                  <option value={user._id} key={index}>
                    {user.firstName + " " + user.lastName}
                  </option>
                ))}
              </select>
            </div>
            <div className="task-modal-section">
              <h3>
                <FaRegCalendarAlt className="task-modal-icon" /> Deadline
              </h3>
              {/* <p>{new Date(task.deadline).toLocaleDateString()}</p> */}
              <input
                type="date"
                value={newTask.deadline}
                placeholder="Deadline:"
                onChange={(e) =>
                  setNewTask({ ...newTask, deadline: e.target.value })
                }
              />
            </div>
            <div className="task-modal-section">
              <label htmlFor="task-priority">Priority:</label>
              <select
                id="task-priority"
                onChange={(e) =>
                  setNewTask({ ...newTask, priority: e.target.value })
                }
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="task-modal-section">
              <button onClick={() => addTask(newTask)}>Add Task</button>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (type === "view") {
    return (
      <div className="task-modal-overlay" onClick={closeModal}>
        <div
          className="task-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="task-modal-header">
            <h2 className="task-modal-title">{task.title}</h2>
            <button className="task-modal-close" onClick={closeModal}>
              &times;
            </button>
          </div>
          <div className="task-modal-body">
            <div className="task-modal-section">
              <h3>Description</h3>
              <p>{task.description}</p>
            </div>
            <div className="task-modal-section">
              <h3>
                <FaRegCalendarAlt className="task-modal-icon" /> Deadline
              </h3>
              <p>{new Date(task.deadline).toLocaleDateString()}</p>
            </div>
            <div className="task-modal-section">
              <h3>
                <FaTasks className="task-modal-icon" /> Subtasks
              </h3>
              {task.subTasks.length > 0 ? (
                <ul>
                  {task.subTasks.map((subTask, index) => (
                    <li key={index}>{subTask.title}</li>
                  ))}
                </ul>
              ) : (
                <p>No subtasks</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default TaskModal;
