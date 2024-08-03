import adminService from "../services/adminService";

const adminLoader = {
  getAllUsers: async () => {
    return await adminService.getAllUsers();
  },
  getAllProjects: async () => {
    try {
      const response = await adminService.getAllProjects();
      return response.data;
    } catch (error) {
      return [];
    }
  },
};

export default adminLoader;
