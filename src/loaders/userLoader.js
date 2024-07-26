import userService from "../services/userService";

// Defining a user loader object
const userLoader = {
  checkAuth: async () => {
    try {
      await userService.checkAuthentication();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};

// Exporting the user loader object
export default userLoader;
