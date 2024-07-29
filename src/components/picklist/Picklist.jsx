import "./Picklist.css";

const Picklist = ({ value, onChange }) => {
  return (
    <div className="picklist">
      <label htmlFor="priority-filter">Sort by priority:</label>
      <select
        id="priority-filter"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="none">None</option>
        <option value="high-to-low">High to Low</option>
        <option value="low-to-high">Low to High</option>
      </select>
    </div>
  );
};

export default Picklist;
