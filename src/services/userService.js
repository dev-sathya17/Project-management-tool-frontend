import { instance } from "./instance";

// Creating a user service object
const userService = {
  // Service to check user Authentication
  checkAuthentication: async () => {
    return await instance.get("/users/checkAuth");
  },

  // Service to register a new user
  registerUser: async (userData) => {
    return await instance.post("/users", userData);
  },
};

// Exporting the user service
export default userService;
