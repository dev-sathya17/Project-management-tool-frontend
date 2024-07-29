import adminService from "../services/adminService";

const adminLoader = {
  getAllUsers: async () => {
    return await adminService.getAllUsers();
  },
};

export default adminLoader;
