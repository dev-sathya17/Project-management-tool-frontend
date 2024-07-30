import { Link } from "react-router-dom";
import "./Pills.css";
const Pills = ({ data, type, page, handleClick }) => {
  return (
    <div
      className="pill"
      onClick={type === "add" ? () => handleClick() : () => handleClick(data)}
    >
      {type === "projects" ? (
        <>
          <p className="pill-title">{data.title}</p>
        </>
      ) : type === "add" ? (
        <>
          <p className="pill-title">Add Project</p>
        </>
      ) : (
        <>
          <Link to={page} className="pill-link">
            <p className="pill-title">{data.title}</p>
          </Link>
        </>
      )}
    </div>
  );
};

export default Pills;
