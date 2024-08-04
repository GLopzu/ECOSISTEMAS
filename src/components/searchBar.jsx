import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery, limit, setLimit, type, setType }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <select value={limit} onChange={(e) => setLimit(e.target.value)}>
        {[4, 8, 12, 16, 20, 24].map((num) => (
          <option key={num} value={num}>{num}</option>
        ))}
      </select>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="">All</option>
        <option value="TV">TV</option>
        <option value="Movie">Movie</option>
        <option value="OVA">OVA</option>
      </select>
    </div>
  );
};

export default SearchBar;
