import { useNavigate } from "react-router-dom";
import DashboardAdmin from "../../components/AdminDashboard/DashboardAdmin";
import Navbar from "../../components/navbar/Navbar";
import userService from "../../services/userService";
import "./dashboard.css";
import useStorage from "../../hooks/useStorage";
const AdminDashboard = () => {
  const navigate = useNavigate();
  const { removeValueFromStorage } = useStorage();

  const handleLogout = () => {
    const choice = confirm("Are you sure you want to log out");
    if (choice) {
      userService
        .logout()
        .then((response) => {
          if (response.status === 200) {
            alert("Logged out successfully");
            removeValueFromStorage("user");
            navigate("/login");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <Navbar handleClick={handleLogout} />
      <div className="adm-dashboard-container">
        <DashboardAdmin />
      </div>
    </div>
  );
};

export default AdminDashboard;
