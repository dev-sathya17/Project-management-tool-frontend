import { instance } from "./instance";

// Creating a user service object
const userService = {
  // Service to check user Authentication
  checkAuthentication: async () => {
    return await instance.get("/users/checkAuth");
  },
};

// Exporting the user service
export default userService;
