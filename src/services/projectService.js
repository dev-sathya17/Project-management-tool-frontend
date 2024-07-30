import { protectedInstance } from "./instance";

// Creating a project service object
const projectService = {
  getProjectProgress: async (id) => {
    return await protectedInstance.get(`/projects/${id}/task-status`);
  },
  getPendingTasks: async (id) => {
    return await protectedInstance.get(`/projects/${id}/pending`);
  },
  getProjectRisks: async (id) => {
    return await protectedInstance.get(`/projects/${id}/risks`);
  },
  getProjectPendingDuration: async (id) => {
    return await protectedInstance.get(`/projects/${id}/pending-duration`);
  },
  getProjectProductivity: async (id) => {
    return await protectedInstance.get(`/projects/${id}/productivity`);
  },
  getTeam: async () => {
    return await protectedInstance.get(`/projects/team`);
  },
};

// Export the project service
export default projectService;
