import "./SearchBar.css";

const SearchBar = ({ searchTerm, onSearch }) => {
  return (
    <input
      type="text"
      className="search-bar"
      placeholder="Search users..."
      value={searchTerm}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};

export default SearchBar;
