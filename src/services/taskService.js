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
};

export default taskService;
