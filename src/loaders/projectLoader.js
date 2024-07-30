import projectService from "../services/projectService";
const projectLoader = {
  getProjectMembers: async () => {
    return await projectService.getTeam();
  },
};

export default projectLoader;
