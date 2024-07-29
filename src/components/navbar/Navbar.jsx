import "./Navbar.css";
import Logo from "../logo/Logo";
import Switch from "../switch/Switch";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ handleClick }) => {
  const [view, setView] = useState(false);

  const handleToggle = () => setView(!view);

  return (
    <>
      <nav className="navbar">
        <div className="nav-header">
          <Logo />
        </div>
        {!view && (
          <RxHamburgerMenu className="hamburger-icon" onClick={handleToggle} />
        )}
        <ul className="nav-items">
          <li className="nav-item">
            <Link className="nav-link" to="/admin/users">
              Manage Users
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/reports">
              View Reports
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/projects">
              View Projects
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/tasks">
              View Tasks
            </Link>
          </li>
        </ul>
        <div className="nav-footer">
          <Switch />
          <button className="nav-logout-btn" onClick={handleClick}>
            LOGOUT
          </button>
        </div>
      </nav>
      {view && (
        <div className="nav-mob">
          <div className="nav-mob-header">
            <Logo />
            <Switch />
            <RxCross2 className="hamburger-icon" onClick={handleToggle} />
          </div>
          <ul className="nav-body-mob">
            <li className="nav-item">Manage Users</li>
            <li className="nav-item">View Reports</li>
            <li className="nav-item">View Projects</li>
            <li className="nav-item">View Tasks</li>
          </ul>
          <div className="nav-footer-mob">
            <button className="nav-logout-btn" onClick={handleClick}>
              LOGOUT
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
