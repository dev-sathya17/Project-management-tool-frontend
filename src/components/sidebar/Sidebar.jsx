import { useUser } from "../../contexts/UserContext";
import Switch from "../switch/Switch";
import "./Sidebar.css";
const Sidebar = ({ children, handleClick, handleProfileView }) => {
  const { user } = useUser();

  if (user) {
    user.image = user.image.replace("\\", "/");
  }

  return (
    <div className="sidebar-container">
      <main className="sidebar-main">{children}</main>
      <footer className="sidebar-footer">
        <div className="profile-sidebar-container">
          <img
            src={
              user.image
                ? `https://project-management-tool-backend-wzfm.onrender.com/${user.image}`
                : "https://img.freepik.com/premium-photo/graphic-designer-digital-avatar-generative-ai_934475-9292.jpg"
            }
            alt="Profile picture"
            className="profile"
            onClick={handleProfileView}
          />
          <h3 className="sidebar-user-name">
            Welcome, {user && user.firstName}
          </h3>
        </div>
        <Switch />
        <button className="logout-btn" onClick={handleClick}>
          LOGOUT
        </button>
      </footer>
    </div>
  );
};

export default Sidebar;
