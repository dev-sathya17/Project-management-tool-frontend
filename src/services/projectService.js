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
  addMember: async (member, id) => {
    return await protectedInstance.put(`/projects/${id}`, {
      members: [member],
    });
  },
  getProjectById: (id) => {
    return protectedInstance.get(`/projects/${id}`);
  },
  removeMember: async (memberId, id) => {
    return await protectedInstance.delete(
      `/projects/${id}/members/${memberId}`
    );
  },
  updateProjectStatus: async (projectId, status) => {
    return await protectedInstance.put(`/projects/${projectId}/`, {
      status,
    });
  },
  addProject: async (project) => {
    return await protectedInstance.post(`/projects`, project);
  },
};

// Export the project service
export default projectService;
