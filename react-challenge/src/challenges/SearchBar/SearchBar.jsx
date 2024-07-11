import React, { useState } from 'react';
import './SearchBar.css'; // Ensure you have this CSS file

const data = [
  "apple",
  "banana",
  "cherry",
  "date",
  "fig",
  "grape",
  "kiwi",
  // Add more data as needed
];

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 0) {
      const filteredData = data.filter(item => 
        item.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredData);
    } else {
      setSuggestions([]);
    }
  };

  const highlightText = (text, highlight) => {
    const lowerText = text.toLowerCase();
    const lowerHighlight = highlight.toLowerCase();

    const startIndex = lowerText.indexOf(lowerHighlight);
    if (startIndex === -1) {
      return text;
    }

    const endIndex = startIndex + highlight.length;

    return (
      <span>
        {text.substring(0, startIndex)}
        <span className="highlight">
          {text.substring(startIndex, endIndex)}
        </span>
        {text.substring(endIndex)}
      </span>
    );
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="search-bar">
      <input 
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search..."
      />
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {highlightText(suggestion, query)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
