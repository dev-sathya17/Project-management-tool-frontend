import { useLoaderData } from "react-router-dom";
import "./Users.css";
import { useState } from "react";
import UserModal from "../../components/UserModal/UserModal";
import SearchBar from "../../components/SearchBar/SearchBar";
import Card from "../../components/card/Card";
import userService from "../../services/userService";
const Users = () => {
  const { data } = useLoaderData();
  const { allUsers } = data;
  const [users, setUsers] = useState(allUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingUser, setEditingUser] = useState(null);

  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleDelete = (userToDelete) => {
    const choice = confirm(
      `Are you sure you want to delete ${userToDelete.firstName} ${userToDelete.lastName}`
    );
    if (choice) {
      userService
        .deleteUser(userToDelete._id)
        .then((response) => {
          if (response.status === 200) {
            alert("User deleted successfully");
            setUsers(users.filter((user) => user !== userToDelete));
          }
        })
        .catch((error) => {
          console.error(error);
          alert("Failed to delete user");
        });
    }
  };

  const handleSave = (updatedUser) => {
    const userToUpdate = {
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      salaryPerMonth: updatedUser.salaryPerMonth,
      mobile: updatedUser.mobile,
      _id: updatedUser._id,
    };
    userService
      .updateProfile(userToUpdate)
      .then((response) => {
        if (response.status === 200) {
          alert("User updated successfully");
          setUsers(
            users.map((user) =>
              user.email === updatedUser.email ? updatedUser : user
            )
          );
          setEditingUser(false);
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to update user");
      });
  };

  return (
    <div className="user-list-container">
      <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
      <div className="user-list">
        {filteredUsers.map((user) => (
          <Card
            key={user.email}
            user={user}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
      {editingUser && (
        <UserModal
          user={editingUser}
          onSave={handleSave}
          onClose={() => setEditingUser(null)}
        />
      )}
    </div>
  );
};

export default Users;
