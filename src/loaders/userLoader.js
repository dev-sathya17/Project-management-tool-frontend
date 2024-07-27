import userService from "../services/userService";

// Defining a user loader object
const userLoader = {
  checkAuth: async () => {
    try {
      const response = await userService.checkAuthentication();
      return { isAuthenticated: true, role: response.data.role };
    } catch (error) {
      console.log(error);
      return { isAuthenticated: false, role: null };
    }
  },
};

// Exporting the user loader object
export default userLoader;
