import { useEffect, useState } from "react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import Column from "../KanbanColumn/Column";
import { columns } from "./columns";
import "./Kanban.css";
import { createPortal } from "react-dom";
import TaskCard from "../KanbanItem/TaskCard";
import taskService from "../../services/taskService";
import TaskModal from "../TaskModal/TaskModal";

const KanbanBoard = ({ tasks, filter }) => {
  const [kanbanColumns, setKanbanColumns] = useState(columns);
  const [taskItems, setTaskItems] = useState(tasks);
  const [activeColumn, setActiveColumn] = useState();
  const [activeTask, setActiveTask] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  useEffect(() => {
    let sortedTasks = [...tasks];
    if (filter === "high-to-low") {
      sortedTasks.sort((a, b) => {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
    } else if (filter === "low-to-high") {
      sortedTasks.sort((a, b) => {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      });
    }
    setTaskItems(sortedTasks);
  }, [tasks, filter]);

  const onDragStart = (event) => {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
    }
  };

  const onDragEnd = (event) => {
    setActiveColumn(null);
    setActiveTask(null);
    const { active, over } = event;

    if (!over) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    if (activeData.type === "Column" && overData.type === "Column") {
      if (active.id !== over.id) {
        setKanbanColumns((columns) => {
          const oldIndex = columns.findIndex((col) => col.id === active.id);
          const newIndex = columns.findIndex((col) => col.id === over.id);
          return arrayMove(columns, oldIndex, newIndex);
        });
      }
    }

    if (activeData.type === "Task") {
      if (overData.type === "Column") {
        const task = activeData.task;
        const newStatus = overData.column.title.toLowerCase();
        task.status = newStatus;
        taskService
          .updateTaskStatus(task._id, newStatus)
          .then((response) => {
            if (response.status === 200) {
              alert(`Task moved to "${newStatus}"`);
            }
          })
          .catch((error) => {
            console.log(error);
          });
        return;
      }
    }
  };

  const onDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id === over.id) return;
    const activeType = active.data.current?.type;
    const overType = over.data.current?.type;
    if (!activeType === "Task") return;
    if (activeType === "Task" && overType === "Task") {
      setTaskItems((items) => {
        const activeIndex = items.findIndex((item) => item._id === active.id);
        const overIndex = items.findIndex((item) => item._id === over.id);
        items[activeIndex].status = items[overIndex].status;

        return arrayMove(items, activeIndex, overIndex);
      });
    }
  };

  const openModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
    >
      <div className="kanban-board">
        <SortableContext
          items={kanbanColumns}
          strategy={horizontalListSortingStrategy}
        >
          {kanbanColumns.map((column) => (
            <Column
              key={column.id}
              column={column}
              tasks={taskItems.filter(
                (task) => task.status === column.title.toLowerCase()
              )}
              openModal={openModal}
            />
          ))}
        </SortableContext>
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <Column
                column={activeColumn}
                key={activeColumn.id}
                openModal={openModal}
                tasks={taskItems.filter(
                  (task) => task.status === activeColumn.title.toLowerCase()
                )}
              />
            )}
            {activeTask && <TaskCard task={activeTask} />}
          </DragOverlay>,
          document.body
        )}
        {isModalOpen && (
          <TaskModal task={selectedTask} closeModal={closeModal} />
        )}
      </div>
    </DndContext>
  );
};

export default KanbanBoard;
