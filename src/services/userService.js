import { instance, protectedInstance } from "./instance";

// Creating a user service object
const userService = {
  // Service to check user Authentication
  checkAuthentication: async () => {
    return await protectedInstance.get("/users/checkAuth");
  },

  // Service to register a new user
  registerUser: async (userData) => {
    return await instance.post("/users", userData);
  },

  // Service to login a user
  login: async (userData) => {
    return await instance.post("/users/login", userData, {
      withCredentials: true,
    });
  },

  // Service to fetch projects of the user
  fetchProjects: async () => {
    return await protectedInstance.get("/projects");
  },
};

// Exporting the user service
export default userService;
