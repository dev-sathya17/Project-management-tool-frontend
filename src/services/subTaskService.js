import { protectedInstance } from "./instance";

const subTaskService = {
  createSubTask: async (subtask, taskId) => {
    return await protectedInstance.post(`/tasks/${taskId}/subTasks`, subtask);
  },
  deleteSubTask: async (subTaskId, taskId) => {
    return await protectedInstance.delete(
      `/tasks/${taskId}/subTasks/${subTaskId}`
    );
  },
};

export default subTaskService;
