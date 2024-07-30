import { protectedInstance } from "./instance";

const taskService = {
  getUserTasks: async () => {
    return await protectedInstance.get("/projects/tasks/user-tasks");
  },
  updateTaskStatus: async (taskId, status) => {
    return await protectedInstance.put(`/projects/tasks/${taskId}/status`, {
      status,
    });
  },
  addTask: async (task, id) => {
    return await protectedInstance.post(`/projects/${id}/tasks`, task);
  },

  deleteTask: async (projectid, taskId) => {
    return await protectedInstance.delete(
      `/projects/${projectid}/tasks/${taskId}`
    );
  },
};

export default taskService;
