import axios from "axios";

// Defining the base URl
const baseURL = "http://localhost:3000/api/v1";

// Creating an axios instance
const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

export { instance };