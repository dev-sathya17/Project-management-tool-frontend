import "./Profile.css";
import { FaUserCog } from "react-icons/fa";
import { FaUserClock } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaMobile } from "react-icons/fa";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";
import { useRef, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import UserModal from "../../components/user modal/UserModal";
import userService from "../../services/userService";
import useStorage from "../../hooks/useStorage";

const Profile = () => {
  // const [image, setImage] = useState(null);
  const [editUser, setEditUser] = useState();

  const { user, setUser } = useUser();

  const { getValueFromStorage } = useStorage();

  if (!user) {
    const storedUser = getValueFromStorage("user");
    console.log(storedUser);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }

  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      console.log(imageUrl);
      // setImage(imageUrl);
    }
  };

  const toggleUpdate = () => setEditUser(user);

  const handleUpdate = (values) => {
    userService
      .updateProfile(values)
      .then((response) => {
        setUser(response.data.updatedUser);
        alert("Profile updated successfully");
        setEditUser(null);
      })
      .catch((error) => {
        console.log(error);
        alert("Failed to update profile");
        setEditUser(null);
      });
  };

  return (
    <div className="profile-container">
      <div className="profile-head">
        <div className="profile-image">
          <img
            src={`http:localhost:3000/uploads/${user.image.split("\\")[1]}`}
            alt={user.firstName}
          />
        </div>
        <div className="camera-icon">
          <FaCamera onClick={handleIconClick} />
          <input
            type="file"
            ref={fileInputRef}
            className="file-input"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      </div>
      <div className="profile-body">
        <div className="profile-row">
          <div className="profile-cell">
            <FaEdit className="profile-icon edit-icon" onClick={toggleUpdate} />
          </div>
        </div>
        <div className="profile-row">
          <div className="profile-cell">
            <FaUser className="profile-icon" />
            <p className="profile-text">{user.firstName}</p>
          </div>
          <div className="profile-cell">
            <FaUser className="profile-icon" />
            <p className="profile-text">{user.lastName}</p>
          </div>
        </div>
        <div className="profile-row">
          <div className="profile-cell">
            {user.role === "admin" ? (
              <FaUserCog className="profile-icon" />
            ) : user.role === "employee" ? (
              <FaUserClock className="profile-icon" />
            ) : user.role === "teamLeader" ? (
              <FaUserTie className="profile-icon" />
            ) : (
              <></>
            )}
            <p className="profile-text user-role">{user.role}</p>
          </div>
          <div className="profile-cell">
            <MdEmail className="profile-icon" />
            <p className="profile-text">{user.email}</p>
          </div>
        </div>
        <div className="profile-row">
          <div className="profile-cell">
            <FaMobile className="profile-icon" />
            <p className="profile-text">{user.mobile}</p>
          </div>
          <div className="profile-cell">
            <RiMoneyRupeeCircleFill className="profile-icon" />
            <p className="profile-text">{user.salaryPerMonth}</p>
          </div>
        </div>
      </div>
      {editUser && (
        <UserModal
          user={editUser}
          onClose={() => setEditUser(null)}
          onSave={handleUpdate}
        />
      )}
    </div>
  );
};

export default Profile;
