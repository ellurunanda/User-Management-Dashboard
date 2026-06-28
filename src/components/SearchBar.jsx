function SearchBar({ value, onChange, onClear }) {
  return (
    <div className="search-panel">
      <label htmlFor="search-input">Search users</label>
      <div className="search-input-wrap">
        <input
          id="search-input"
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search by first name, last name, or email"
        />
        {value ? (
          <button type="button" className="btn btn-ghost" onClick={onClear}>
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default SearchBar;
