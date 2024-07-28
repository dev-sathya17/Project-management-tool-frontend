import "./Profile.css";
import { FaUserCog } from "react-icons/fa";
import { FaUserClock } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaMobile } from "react-icons/fa";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";
import { useRef, useState } from "react";
import { useUser } from "../../contexts/UserContext";

const Profile = () => {
  const [isUpdate, setUpdate] = useState(true);
  const [image, setImage] = useState(null);

  const { user } = useUser();

  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      console.log(imageUrl);
      setImage(imageUrl);
    }
  };

  const toggleUpdate = () => setUpdate(!isUpdate);

  return (
    <div className="profile-container">
      <div className="profile-head">
        <div className="profile-image">
          <img src={user.image} alt={user.firstName} />
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
            {isUpdate ? (
              <FaEdit
                className="profile-icon edit-icon"
                onClick={toggleUpdate}
              />
            ) : (
              <FaCheckCircle
                className="profile-icon submit-icon"
                onClick={toggleUpdate}
              />
            )}

            <MdDelete className="profile-icon delete-icon" />
          </div>
        </div>
        <div className="profile-row">
          <div className="profile-cell">
            <FaUser className="profile-icon" />
            {isUpdate ? (
              <p className="profile-text">{user.firstName}</p>
            ) : (
              <input
                className="profile-input"
                type="text"
                value={user.firstName}
              />
            )}
          </div>
          <div className="profile-cell">
            <FaUser className="profile-icon" />
            {isUpdate ? (
              <p className="profile-text">{user.lastName}</p>
            ) : (
              <input
                className="profile-input"
                type="text"
                value={user.lastName}
              />
            )}
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
            {isUpdate ? (
              <p className="profile-text">{user.email}</p>
            ) : (
              <input className="profile-input" type="text" value={user.email} />
            )}
          </div>
        </div>
        <div className="profile-row">
          <div className="profile-cell">
            <FaMobile className="profile-icon" />
            {isUpdate ? (
              <p className="profile-text">{user.mobile}</p>
            ) : (
              <input
                className="profile-input"
                type="text"
                value={user.mobile}
              />
            )}
          </div>
          <div className="profile-cell">
            <RiMoneyRupeeCircleFill className="profile-icon" />
            {isUpdate ? (
              <p className="profile-text">{user.salaryPerMonth}</p>
            ) : (
              <input
                className="profile-input"
                type="text"
                value={user.salaryPerMonth}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
