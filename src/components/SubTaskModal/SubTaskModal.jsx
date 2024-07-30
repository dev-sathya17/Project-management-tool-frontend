import { useState } from "react";

const SubTaskModal = ({ closeModal, addSubTask }) => {
  const [newSubTask, setNewSubTask] = useState({
    title: "",
    description: "",
  });

  return (
    <div className="task-modal-overlay" onClick={closeModal}>
      <div className="task-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="task-modal-header">
          <h2 className="task-modal-title">Add a sub task</h2>
          <button className="task-modal-close" onClick={closeModal}>
            &times;
          </button>
        </div>
        <div className="task-modal-body">
          <div className="task-modal-section">
            <input
              type="text"
              value={newSubTask.title}
              placeholder="Title:"
              onChange={(e) =>
                setNewSubTask({ ...newSubTask, title: e.target.value })
              }
            />
          </div>
          <div className="task-modal-section">
            <input
              type="text"
              value={newSubTask.description}
              placeholder="Description:"
              onChange={(e) =>
                setNewSubTask({ ...newSubTask, description: e.target.value })
              }
            />
          </div>

          <div className="task-modal-section">
            <button onClick={() => addSubTask(newSubTask)}>Add Sub Task</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubTaskModal;
