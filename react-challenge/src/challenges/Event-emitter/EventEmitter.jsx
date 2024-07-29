// App.js
import React, { useEffect, useState } from 'react';

// EventEmitter class definition
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  off(event, listenerToRemove) {
    if (!this.events[event]) return;

    this.events[event] = this.events[event].filter(listener => listener !== listenerToRemove);
  }

  emit(event, ...args) {
    if (!this.events[event]) return;

    this.events[event].forEach(listener => {
      listener(...args);
    });
  }
}

const App = () => {
  const [message, setMessage] = useState('');
  const eventEmitter = new EventEmitter();

  useEffect(() => {
    const handleMessage = (msg) => {
      setMessage(msg);
    };

    eventEmitter.on('message', handleMessage);

    // Cleanup the event listener on component unmount
    return () => {
      eventEmitter.off('message', handleMessage);
    };
  }, [eventEmitter]);

  const handleClick = () => {
    eventEmitter.emit('message', 'Hello from the button');
  };

  return (
    <div className="App">
      <h1>Event Emitter Example</h1>
      <button onClick={handleClick}>Send Message</button>
      <p>{message}</p>
    </div>
  );
}

export default App;
