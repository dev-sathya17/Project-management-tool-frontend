import "./Sidebar.css";
import Logo from "../logo/Logo";
const Sidebar = ({ children }) => {
  return (
    <div className="sidebar-container">
      <header className="sidebar-header">
        <Logo />
      </header>
      <main className="sidebar-main">{children}</main>
      <footer className="sidebar-footer">
        <div className="profile-container">
          <img
            src="https://img.freepik.com/premium-photo/graphic-designer-digital-avatar-generative-ai_934475-9292.jpg"
            alt="Profile picture"
            className="profile"
          />
          <h3>Hello, User Name</h3>
        </div>
        <button className="logout-btn">LOGOUT</button>
      </footer>
    </div>
  );
};

export default Sidebar;
