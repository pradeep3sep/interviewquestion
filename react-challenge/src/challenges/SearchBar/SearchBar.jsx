import React, { useState } from 'react';

const SearchHighlight = () => {
  const [query, setQuery] = useState('');
  
  const data = [
    'React',
    'Angular',
    'Vue',
    'Svelte',
    'Ember',
    'Backbone',
    'Nuxt',
    'Next'
  ];

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const highlightText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={index} style={{ backgroundColor: 'yellow' }}>{part}</span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  const filteredData = data.filter(item =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <input 
        type="text" 
        value={query} 
        onChange={handleChange} 
        placeholder="Search..." 
      />
      <ul>
        {filteredData.map((item, index) => (
          <li key={index}>
            {highlightText(item, query)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchHighlight;
