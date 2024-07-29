import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskCard from "../KanbanItem/TaskCard";
import "./Column.css";

const Column = ({ column, tasks, openModal }) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: { type: "Column", column },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.7 : 1,
  };

  return (
    <div className="column" ref={setNodeRef} style={style}>
      <header className="kanban-column-header" {...attributes} {...listeners}>
        <p className="column-title">{column.title}</p>
        <p className="badge">{tasks.length}</p>
      </header>
      <main className="column-body">
        <SortableContext
          items={tasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} openModal={openModal} />
          ))}
        </SortableContext>
      </main>
    </div>
  );
};

export default Column;
