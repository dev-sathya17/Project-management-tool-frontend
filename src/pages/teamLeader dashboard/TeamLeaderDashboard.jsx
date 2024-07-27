import { useUser } from "../../contexts/UserContext";

const TeamLeaderDashboard = () => {
  const { user } = useUser();
  return (
    <div>
      <h1>Hello {user.firstName}</h1>
    </div>
  );
};

export default TeamLeaderDashboard;
