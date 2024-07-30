import { useLoaderData } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import Card from "../../components/card/Card";
import { useState } from "react";

const ViewTeam = () => {
  const { data } = useLoaderData();

  const { team } = data;

  const [users, setUsers] = useState(team);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-list-container">
      <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
      <div className="user-list">
        {filteredUsers.map((user) => (
          <Card key={user.email} user={user} type={"view"} />
        ))}
      </div>
    </div>
  );
};

export default ViewTeam;
