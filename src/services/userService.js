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
};

// Exporting the user service
export default userService;
