import { useLoaderData } from "react-router-dom";
import "./Users.css";
import { useState } from "react";
import UserModal from "../../components/UserModal/UserModal";
import SearchBar from "../../components/SearchBar/SearchBar";
import Card from "../../components/card/Card";
const Users = () => {
  const { data } = useLoaderData();

  const [users, setUsers] = useState(data);
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
    setUsers(users.filter((user) => user !== userToDelete));
  };

  const handleSave = (updatedUser) => {
    setUsers(
      users.map((user) =>
        user.email === updatedUser.email ? updatedUser : user
      )
    );
    setEditingUser(null);
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
