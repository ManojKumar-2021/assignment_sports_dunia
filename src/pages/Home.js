import React from 'react';
import NewsFeed from '../components/NewsFeed';
import {Link } from 'react-router-dom'; 

const Home = () => {
    return <>
              <nav className="navbar">
            <ul className="nav-list">
              <li className="nav-item">
                <Link to="/home" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link">Dashboard</Link>
              </li>
            </ul>
          </nav>
    <NewsFeed/>
    </>
};

export default Home;
