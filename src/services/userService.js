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

  // Service to logout user
  logout: async () => {
    return await protectedInstance.get("/users/logout");
  },

  // Service to send an email for password reset verification
  forgotPassword: async (email) => {
    return await instance.post("/users/forgot", { email });
  },

  // Service to verify auth string
  verify: async (authString) => {
    return await instance.get(`/users/verify/${authString}`);
  },

  // Service to reset user password
  reset: async (email, password) => {
    return await instance.post("/users/reset", { email, password });
  },

  // Service to update user profile
  updateProfile: async (userData) => {
    return await protectedInstance.put("/users", userData);
  },
};

// Exporting the user service
export default userService;
