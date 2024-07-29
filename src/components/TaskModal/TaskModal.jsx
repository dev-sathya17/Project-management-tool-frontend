import "./TaskModal.css";
import { FaRegCalendarAlt, FaTasks, FaPaperclip } from "react-icons/fa";
const TaskModal = ({ task, closeModal }) => {
  return (
    <div className="task-modal-overlay" onClick={closeModal}>
      <div className="task-modal-content" onClick={(e) => e.stopPropagation()}>
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
                  <li key={index}>{subTask}</li>
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
};

export default TaskModal;
