import React, { useState } from 'react';

const CaptureClickPosition = () => {
  const [positions, setPositions] = useState([]);

  const handleClick = (event) => {
    const { clientX, clientY } = event;
    setPositions((prevPositions) => [...prevPositions, { x: clientX, y: clientY }]);
  };

  return (
    <div onClick={handleClick} style={{ height: '100vh', cursor: 'crosshair' }}>
      <h2>Click anywhere to capture positions:</h2>
      <ul>
        {positions.map((position, index) => (
          <li key={index}>
            Click {index + 1}: X - {position.x}, Y - {position.y}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CaptureClickPosition;
