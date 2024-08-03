import {
  FaUser,
  FaMobile,
  FaUserCog,
  FaUserClock,
  FaUserTie,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import "./Card.css";

const Card = ({ user, onEdit, onDelete, type }) => {
  return (
    <div className="card">
      <img
        src={`https://project-management-tool-backend-wzfm.onrender.com/${
          user.image || "/uploads/avatar.png"
        }`}
        alt={user.firstName}
        className="image"
      />
      <div className="card-details">
        <div className="card-item">
          <FaUser className="card-icon" />
          <h2>
            {user.firstName} {user.lastName}
          </h2>
          {user.role === "admin" ? (
            <FaUserCog className="role-icon" />
          ) : user.role === "employee" ? (
            <FaUserClock className="role-icon" />
          ) : user.role === "teamLeader" ? (
            <FaUserTie className="role-icon" />
          ) : null}
        </div>
        <div className="card-item">
          <MdEmail className="card-icon" />
          <p>{user.email}</p>
        </div>
        <div className="card-item">
          <FaMobile className="card-icon" />
          <p>{user.mobile}</p>
        </div>
        <div className="card-item">
          <RiMoneyRupeeCircleFill className="card-icon" />
          <p>Salary: {user.salaryPerMonth}</p>
        </div>
        {type !== "view" ? (
          <div className="card-actions">
            {type === "manage" ? (
              <></>
            ) : (
              <FaEdit className="edit-icon" onClick={() => onEdit(user)} />
            )}
            <FaTrash className="delete-icon" onClick={() => onDelete(user)} />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Card;
