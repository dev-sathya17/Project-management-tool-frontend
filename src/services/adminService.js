import { protectedInstance } from "./instance";

const adminService = {
  getProgress: async () => {
    return await protectedInstance.get("projects/tasks/admin/progress");
  },
  getProductivity: async () => {
    return await protectedInstance.get("/users/admin/overall-productivity");
  },
  getUsersCount: async () => {
    return await protectedInstance.get("/users/admin/user-types");
  },
  getRisk: async () => {
    return await protectedInstance.get("/projects/admin/highestRisk");
  },
  getSum: async () => {
    return await protectedInstance.get("/projects/admin/totalSum");
  },
  getProjectStatus: async () => {
    return await protectedInstance.get("/projects/admin/statusCount");
  },
  getAllUsers: async () => {
    return await protectedInstance.get("/users/admin");
  },
};

export default adminService;
