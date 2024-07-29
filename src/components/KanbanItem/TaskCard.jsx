import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { RiFlag2Fill } from "react-icons/ri";
import "./TaskCard.css";

const TaskCard = ({ task, openModal }) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task._id,
    data: { type: "Task", task },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.7 : 1,
  };

  return (
    <div
      className="task-card"
      onClick={() => openModal(task)}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className="task-body">
        <p className="task-title">{task.title}</p>
        <p className="task-desc">{task.description}</p>
      </div>
      <div className={`priority ${task.priority.toLowerCase()}`}>
        <RiFlag2Fill className="flag-icon" />
        <p className="">{task.priority}</p>
      </div>
    </div>
  );
};

export default TaskCard;
