// src/Poll.js

import React, { useState } from 'react';

const Poll = ({  question = "What's your favorite programming language?", options = ['JavaScript', 'Python', 'Java', 'C++', 'Go'] }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [votes, setVotes] = useState(Array(options.length).fill(0));
  const [hasVoted, setHasVoted] = useState(false);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedOption !== null) {
      const updatedVotes = [...votes];
      updatedVotes[selectedOption]++;
      setVotes(updatedVotes);
      setHasVoted(true);
    }
  };

  return (
    <div>
      <h2>{question}</h2>
      {!hasVoted ? (
        <div>
          {options.map((option, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`option-${index}`}
                name="poll"
                value={index}
                onChange={handleOptionChange}
              />
              <label htmlFor={`option-${index}`}>{option}</label>
            </div>
          ))}
          <button onClick={handleSubmit}>Submit Vote</button>
        </div>
      ) : (
        <div>
          <h3>Results:</h3>
          {options.map((option, index) => (
            <div key={index}>
              {option}: {votes[index]} votes
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Poll