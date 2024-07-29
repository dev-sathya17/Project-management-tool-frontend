import { useState, useEffect } from "react";
import "./UserModal.css";

const UserModal = ({ user, onSave, onClose }) => {
  const [formData, setFormData] = useState(user);

  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!user) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2 className="modal-title">Edit User</h2>
        <div className="modal-form">
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>

          <label>
            Mobile:
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
            />
          </label>
          <label>
            Salary per Month:
            <input
              type="number"
              name="salaryPerMonth"
              value={formData.salaryPerMonth}
              onChange={handleChange}
            />
          </label>
          <div className="modal-actions">
            <button type="submit" onClick={handleSubmit}>
              Save
            </button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
