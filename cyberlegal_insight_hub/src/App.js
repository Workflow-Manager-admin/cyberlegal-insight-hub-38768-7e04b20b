import React from 'react';
import './App.css';
import MainContainer from './components/MainContainer';

// PUBLIC_INTERFACE
function App() {
  // The main app shell with navigation and the MainContainer handling multi-step content
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
            <span style={{ color: 'var(--base-light)', fontWeight: 500 }}>
              CyberLegal Insight Hub
            </span>
          </div>
        </div>
      </nav>

      <main>
        <MainContainer />
      </main>
    </div>
  );
}

export default App;