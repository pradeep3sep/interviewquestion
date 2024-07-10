import React, { useRef, useState, forwardRef, useImperativeHandle } from 'react';
import './style.css';

const JSONCreator = forwardRef((props, ref) => {
  const [showSubItem, setShowSubItem] = useState(false);
  const [subItems, setSubItems] = useState([]);
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');

  const handleAdd = () => {
    setShowSubItem(true);
    setSubItems([...subItems, React.createRef()]);
  };

  const handleRemove = () => {
    if (props.onRemove) props.onRemove();
  };

  const handleToggle = () => {
    setShowSubItem(!showSubItem);
  };

  const getJSON = () => {
    const object = {};

    if (key) {
      if (!showSubItem) {
        object[key] = value;
      } else {
        let obj = {};
        subItems.forEach((subItemRef) => {
          obj = { ...obj, ...subItemRef.current.getJSON() };
        });

        object[key] = Object.keys(obj).length === 0 ? null : obj;
      }
    }
    return object;
  };

  useImperativeHandle(ref, () => ({
    getJSON,
  }));

  return (
    <div className="json-container">
      <span className={`arrow ${showSubItem ? 'open' : 'hide'}`} onClick={handleToggle}>
        ▶
      </span>
      <input type="text" className="key" placeholder="key" value={key} onChange={(e) => setKey(e.target.value)} />
      <input type="text" className="value" placeholder="value" value={value} onChange={(e) => setValue(e.target.value)} style={{ display: showSubItem ? 'none' : 'inline' }} />
      <button className="add" onClick={handleAdd}>
        +
      </button>
      <button className="remove" onClick={handleRemove}>
        x
      </button>
      {showSubItem &&
        subItems.map((subItemRef, index) => (
          <div className="sub-item" key={index}>
            <JSONCreator ref={subItemRef} onRemove={() => setSubItems(subItems.filter((_, i) => i !== index))} />
          </div>
        ))}
    </div>
  );
});

const JsonCreator = () => {
  const [output, setOutput] = useState('');
  const jsonCreatorRef = useRef();

  const handleGetJSON = () => {
    if (jsonCreatorRef.current) {
      setOutput(JSON.stringify(jsonCreatorRef.current.getJSON(), null, 2));
    }
  };

  return (
    <div className="container">
      <div id="json-holder">
        <JSONCreator ref={jsonCreatorRef} />
      </div>
      <button className="get-json-button" onClick={handleGetJSON}>
        Get JSON
      </button>
      <div>
        <output>{output}</output>
      </div>
    </div>
  );
};

export default JsonCreator;
