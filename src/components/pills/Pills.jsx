import { Link } from "react-router-dom";
import "./Pills.css";
const Pills = ({ data, type, page }) => {
  return (
    <div
      className="pill"
      // onClick={page ? () => handleClick(page) : () => handleClick(data)}
    >
      {type === "projects" ? (
        <>
          <p className="pill-title">{data.title}</p>
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
