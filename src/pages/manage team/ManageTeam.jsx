import { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import Card from "../../components/card/Card";
import UserModal from "../../components/user modal/UserModal";
import "./ManageTeam.css";
import userService from "../../services/userService";
import projectService from "../../services/projectService";
import { useParams } from "react-router-dom";

const ManageTeam = () => {
  const { projectId } = useParams();
  const [unassignedUsers, setUnassignedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [userToAdd, setUserToAdd] = useState("");
  const [project, setProject] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
    setLoading(true);
  }, []);

  const fetchData = () => {
    projectService.getProjectById(projectId).then((response) => {
      if (response.status === 200) {
        console.log(response.data);
        setProject(response.data);
        setUsers(response.data.members);
      }
    });
    userService
      .fetchUnassignedUsers()
      .then((response) => {
        setUnassignedUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleDelete = (userToDelete) => {
    const choice = confirm("Are you sure you want to delete this user?");
    if (choice) {
      projectService
        .removeMember(userToDelete._id, project._id)
        .then(() => {
          alert("User removed successfully");
          projectService.getProjectById(project._id).then((response) => {
            if (response.status === 200) {
              setUsers(users.filter((user) => user._id !== userToDelete._id));
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleSave = (updatedUser) => {
    setUsers(
      users.map((user) =>
        user.email === updatedUser.email ? updatedUser : user
      )
    );
    setEditingUser(null);
  };

  const handleAdd = () => {
    projectService
      .addMember(userToAdd, project._id)
      .then((response) => {
        if (response.status === 200) {
          alert("User added successfully");
          const members = response.data.updatedProject.members;
          fetchData();
          setUserToAdd("");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  let filteredUsers;
  if (!loading) {
    filteredUsers = users.filter((user) =>
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }

  return (
    <>
      {!loading && (
        <div className="user-list-container">
          <div className="manage-team-header">
            <h2>Manage Your Team</h2>
            <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
          </div>
          <div className="add-member-container">
            <label htmlFor="members">Users:</label>
            <select
              id="members"
              value={userToAdd}
              onChange={(e) => setUserToAdd(e.target.value)}
            >
              {unassignedUsers.map((user, index) => (
                <option value={user._id} key={index}>
                  {user.firstName + " " + user.lastName}
                </option>
              ))}
            </select>
            <button className="add-member-btn" onClick={handleAdd}>
              Add Member
            </button>
          </div>
          <div className="user-list">
            {!loading &&
              filteredUsers.map((user, index) => (
                <Card
                  key={index}
                  user={user}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  type={"manage"}
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
      )}
    </>
  );
};

export default ManageTeam;
