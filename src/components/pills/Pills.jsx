import "./Pills.css";
import { IoMdAdd } from "react-icons/io";
const Pills = ({ data, type, handleClick, page }) => {
  return (
    <div
      className="pill"
      onClick={page ? () => handleClick(page) : () => handleClick(data)}
    >
      {type === "add" ? (
        <>
          <span>
            <IoMdAdd className="add-icon" />
          </span>
          <p className="pill-title">{data.title}</p>
        </>
      ) : (
        <>
          <p className="pill-title">{data.title}</p>
        </>
      )}
    </div>
  );
};

export default Pills;
