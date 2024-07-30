import { useEffect, useState } from "react";
import "./TaskModal.css";
import { FaRegCalendarAlt, FaTasks, FaPaperclip } from "react-icons/fa";
import userService from "../../services/userService";
const TaskModal = ({ task, closeModal, type, addTask }) => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    deadline: "",
    attachments: [],
    priority: "low",
    assignedTo: "",
  });
  const [unassignedUsers, setUnassignedUsers] = useState([]);

  useEffect(() => {
    userService
      .fetchTaskUnassignedUsers()
      .then((response) => {
        setUnassignedUsers(response.data);
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
            {/* <h2 className="task-modal-title">{task.title}</h2> */}
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
              {/* <h3>Description</h3> */}
              {/* <p>{task.description}</p> */}
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
                onChange={(e) =>
                  setNewTask({ ...newTask, assignedTo: e.target.value })
                }
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
              <h3>
                <FaPaperclip className="task-modal-icon" /> Attachments
              </h3>
              <input type="file" name="" id="" multiple />
              {/* {task.attachments.length > 0 ? (
                <ul>
                  {task.attachments.map((attachment, index) => (
                    <li key={index}>{attachment}</li>
                  ))}
                </ul>
              ) : (
                <p>No attachments</p>
              )} */}
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
            <div className="task-modal-section">
              <h3>
                <FaPaperclip className="task-modal-icon" /> Attachments
              </h3>
              {task.attachments.length > 0 ? (
                <ul>
                  {task.attachments.map((attachment, index) => (
                    <li key={index}>{attachment}</li>
                  ))}
                </ul>
              ) : (
                <p>No attachments</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default TaskModal;
