import taskService from "../services/taskService";

const taskLoader = {
  getTasks: async () => {
    try {
      const response = await taskService.getUserTasks();
      return response.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  },
};

export default taskLoader;
