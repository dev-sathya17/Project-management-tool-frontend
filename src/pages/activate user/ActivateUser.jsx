import { useEffect } from "react";
import userService from "../../services/userService";
import { useNavigate, useParams } from "react-router-dom";

const ActivateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    userService
      .activateUser(id)
      .then((response) => {
        if (response.status === 200) {
          navigate("/login");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Failed to activate user. Please try again.");
      });
  });

  return <div>ActivateUser</div>;
};

export default ActivateUser;
