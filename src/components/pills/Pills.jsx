import "./Pills.css";
import { IoMdAdd } from "react-icons/io";
const Pills = ({ title, type }) => {
  return (
    <div className="pill">
      {type === "add" ? (
        <>
          <span>
            <IoMdAdd className="add-icon" />
          </span>
          <p className="pill-title">{title}</p>
        </>
      ) : (
        <>
          <p className="pill-title">{title}</p>
        </>
      )}
    </div>
  );
};

export default Pills;
