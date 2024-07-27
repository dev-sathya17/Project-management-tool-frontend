import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Router";
import { UserProvider } from "./contexts/UserContext";
function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
