import React, { useState, useEffect } from 'react';

const DisplayWithDelay = () => {
  const [statement, setStatement] = useState('');
  const [submittedStatement, setSubmittedStatement] = useState('');
  const [displayedWords, setDisplayedWords] = useState([]);

  const handleChange = (e) => {
    setStatement(e.target.value);
  };

  const handleClick = () => {
    setDisplayedWords([]);
    setSubmittedStatement(statement);
  };

  useEffect(() => {
    const words = submittedStatement.split(' ');
    let delay = 0;

    words.forEach((word) => {
      delay = delay + 2000;
      setTimeout(() => {
        setDisplayedWords((prevWords) => [...prevWords, word]);
      }, delay);
    });
  }, [submittedStatement]);

  return (
    <div>
        <h2>Type any word like "Hi are you", it will print "hi" first then "are" and then "you"</h2>
      <input type="text" value={statement} onChange={handleChange} />
      <button onClick={handleClick}>Submit</button>
      <div>
        {displayedWords.map((word, index) => (
          <span key={index}>{word} </span>
        ))}
      </div>
    </div>
  );
};

export default DisplayWithDelay;
