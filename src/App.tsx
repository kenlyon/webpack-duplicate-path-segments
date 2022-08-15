import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  useEffect(() => {
    const worker = new Worker(new URL("./TestWorker.worker.ts", import.meta.url));
    worker.onmessage = (event: MessageEvent<any>) => {
        console.log(`[App] Received:`, event.data);
    };
    // The expected behaviour is for the worker to send a message in response to this one.
    // In reality, there's an error loading one of the chunks.
    worker.postMessage("abc");
  });
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
