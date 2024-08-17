import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Chat from './Chat'; // Import the Chat component
import clothesSvg from './images/clothes.svg'; // Import the default SVG image
import clothes2Svg from './images/clothes2.svg'; // Import the hovered SVG image

function HomePage() {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="App" 
         onMouseEnter={() => setIsHovered(true)} 
         onMouseLeave={() => setIsHovered(false)}
    >
      <div className="container">
        <h1>sty.ly</h1>
        <div className="content">
          <div className="text-container">
            <section className="section feature-1">
              <h2>your style</h2>
            </section>
            <section className="section feature-2">
              <h2>forecasted</h2>
            </section>
          </div>
          <div className="svg-container">
            <img src={clothesSvg} alt="Clothes" className={!isHovered ? '' : 'hidden'} />
            <img src={clothes2Svg} alt="Clothes" className={isHovered ? '' : 'hidden'} />
          </div>
        </div>
        <div className="get-started">
          <button onClick={() => navigate('/chat')}>
            get started
          </button>
        </div>
      </div>
      <div className="more-info">
        <h3>Whether you’re heading out with friends, hitting up a party, or just living your best life, our platform's got your back. We make outfit coordination a breeze by syncing your style with the forecast, so you can step out feeling confident, no matter the season.</h3>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
