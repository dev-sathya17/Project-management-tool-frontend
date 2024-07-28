import "./Pills.css";
import { IoMdAdd } from "react-icons/io";
const Pills = ({ project, type, handleClick }) => {
  return (
    <div className="pill" onClick={() => handleClick(project)}>
      {type === "add" ? (
        <>
          <span>
            <IoMdAdd className="add-icon" />
          </span>
          <p className="pill-title">{project.title}</p>
        </>
      ) : (
        <>
          <p className="pill-title">{project.title}</p>
        </>
      )}
    </div>
  );
};

export default Pills;
