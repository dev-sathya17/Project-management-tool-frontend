import { useParams } from "react-router-dom";
import "./Project.css";
import { FaCircle } from "react-icons/fa6";
import { FaCalendar } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import TaskModal from "../../components/TaskModal/TaskModal";
import taskService from "../../services/taskService";
import projectService from "../../services/projectService";
import { FaCheck } from "react-icons/fa";
import { RiProgress3Fill } from "react-icons/ri";
import { IoWarning } from "react-icons/io5";
import { FaCalendarTimes } from "react-icons/fa";
import { RiFlag2Fill } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";
import subTaskService from "../../services/subTaskService";
import SubTaskModal from "../../components/SubTaskModal/SubTaskModal";

const Project = () => {
  const { projectId } = useParams();

  const [project, setProject] = useState();
  const [viewModal, setViewModal] = useState(false);
  const [taskModal, setTaskModal] = useState(false);
  const [viewTask, setViewTask] = useState();
  const [reRender, setRender] = useState(0);
  const [subTaskModal, setSubTaskModal] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [statusFilter, setStatusFilter] = useState();

  useEffect(() => {
    projectService
      .getProjectById(projectId)
      .then((res) => {
        if (res.status === 200) {
          setProject(res.data);
          setStatusFilter(res.data.status);
        } else {
          alert("Failed to fetch project");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [reRender]);

  const openTaskModal = (task) => {
    setTaskModal(true);
    setViewTask(task);
  };

  const closeTaskModal = () => {
    setTaskModal(false);
    setViewTask(null);
  };

  const openModal = () => {
    setViewModal(true);
  };

  const deleteTask = (task) => {
    console.log(project);
    taskService
      .deleteTask(project._id, task._id)
      .then((res) => {
        if (res.status === 200) {
          alert("Task deleted successfully");
          setRender(reRender + 1);
        } else {
          alert("Failed to delete task");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteSubTask = (subtaskId, taskId) => {
    subTaskService
      .deleteSubTask(subtaskId, taskId)
      .then((res) => {
        if (res.status === 200) {
          alert("Sub Task deleted successfully");
          setRender(reRender + 1);
        } else {
          alert("Failed to delete sub task");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const changeProjectStatus = (status) => {
    if (status === project.status) {
      alert("Status needs to be updated");
      return;
    }
    projectService
      .updateProjectStatus(project._id, status)
      .then((response) => {
        if (response.status === 200) {
          alert("Project status updated successfully");
          setStatusFilter(status);
          setRender(reRender + 1);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const openSubTaskModal = (taskId) => {
    setSubTaskModal(true);
    setTaskId(taskId);
  };

  const closeSubTaskModal = () => {
    setSubTaskModal(false);
  };

  const addSubTask = (subTask) => {
    subTaskService
      .createSubTask(subTask, taskId)
      .then((res) => {
        if (res.status === 201) {
          alert("Sub Task Added successfully");
          setRender(reRender + 1);
          closeSubTaskModal();
        } else {
          alert("Failed to add sub task");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getStatusIcon = (status) => {
    if (project) {
      switch (status) {
        case "completed":
          return <FaCheck />;
        case "in-progress":
          return <RiProgress3Fill />;
        case "idle":
          return <IoWarning />;
        case "backlog":
          return <FaCalendarTimes />;
        default:
          return "";
      }
    }
  };

  const addTask = (task) => {
    console.log(task);
    taskService
      .addTask(task, project._id)
      .then((res) => {
        if (res.status === 201) {
          alert("Task added successfully");
          project.tasks.push(res.data.newTask);
          closeModal();
          setRender(reRender + 1);
        } else {
          alert("Failed to add task");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const closeModal = () => {
    setViewModal(false);
  };

  return (
    <>
      {project && (
        <div className="project-wrapper">
          <div className="project-container">
            <div className={`project-status project-row ${project.status}`}>
              <div className="project-status-item">
                <FaCircle />
                <p>{project.status}</p>
              </div>
              <div>
                <div className="status-filters">
                  <label htmlFor="status">Filter by status:</label>
                  <select
                    id="status"
                    className="status-dropdown"
                    value={statusFilter}
                    onChange={(e) => changeProjectStatus(e.target.value)}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="project-header project-row">
              <div className="project-title">
                <h3>{project.title}</h3>
              </div>
              <div className="project-dates">
                <div className="project-date">
                  <FaCalendar />
                  <p>{new Date(project.startDate).toLocaleDateString()}</p>
                </div>
                <div className="project-date">
                  <FaCalendar />
                  <p>{new Date(project.endDate).toLocaleDateString()}</p>
                </div>
                <div className="project-duration">
                  <p>{project.duration.toFixed(2)} month(s)</p>
                </div>
              </div>
            </div>
            <div className="project-sub-header project-row">
              <div className="project-description">
                <p>{project.description}</p>
              </div>
              <div className="project-members">
                {project.members.map((member) => (
                  <div className="project-member" key={member._id}>
                    <img
                      src={`https://pro-manager-tool.netlify.app/${
                        member.image || "/uploaads/avatar.png"
                      }`}
                      alt={member.firstName}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="project-tasks-container project-row">
              <div className="project-task-header">
                <h3>Tasks</h3>
                <FaCirclePlus className="add-icon" onClick={openModal} />
              </div>
              <div className="project-tasks">
                {project.tasks.map((task) => {
                  return (
                    <ul className="project-task" key={task._id}>
                      <div className="task-item-container">
                        <li
                          className="task-item pressable"
                          onClick={() => openTaskModal(task)}
                        >
                          {task.title}
                        </li>
                        <div className="task-item-info">
                          <li className={`task-item ${task.priority}`}>
                            <RiFlag2Fill />
                          </li>
                          <li className="task-item">
                            {getStatusIcon(task.status)}
                          </li>
                          <li className="task-item">{task.subTasks.length}</li>
                          <li className="task-item pressable">
                            <FaTrash
                              color="red"
                              onClick={() => deleteTask(task)}
                            />
                          </li>
                          <li className="task-item pressable">
                            <FaCirclePlus
                              className="add-icon"
                              onClick={() => openSubTaskModal(task._id)}
                            />
                          </li>
                        </div>
                      </div>
                      <ul className="project-subtasks">
                        {task.subTasks.length > 0 &&
                          task.subTasks.map((subtask) => {
                            return (
                              <div className="sub-task-items" key={subtask._id}>
                                <li className="task-item">{subtask.title}</li>
                                <div className="task-item-info">
                                  <li className="task-item">
                                    {subtask.description}
                                  </li>
                                  <li className="task-item">
                                    {getStatusIcon(subtask.status)}
                                  </li>
                                  <li className="task-item pressable">
                                    <FaTrash
                                      color="red"
                                      onClick={() =>
                                        deleteSubTask(subtask._id, task._id)
                                      }
                                    />
                                  </li>
                                </div>
                              </div>
                            );
                          })}
                      </ul>
                    </ul>
                  );
                })}
              </div>
            </div>
          </div>
          {viewModal && (
            <TaskModal type={"add"} closeModal={closeModal} addTask={addTask} />
          )}
          {taskModal && (
            <TaskModal
              type={"view"}
              closeModal={closeTaskModal}
              task={viewTask}
            />
          )}
          {subTaskModal && (
            <SubTaskModal
              closeModal={closeSubTaskModal}
              addSubTask={addSubTask}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Project;
