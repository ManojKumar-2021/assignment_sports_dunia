import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Import Link
import React from 'react';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Home from './pages/Home';
import Dashboard from './components/Dashboard'; // Import Dashboard
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>NewsAdda</h1>
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
