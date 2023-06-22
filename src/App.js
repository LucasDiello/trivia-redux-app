import React from 'react';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import logo from './trivia.png';
import './App.css';
import Login from './components/Login';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>SUA VEZ</p>
        <Route exact path="/" component={ Login } />
      </header>
    </div>
  );
}
