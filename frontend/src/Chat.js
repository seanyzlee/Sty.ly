// src/Chat.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Chat.css';

function Chat() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activePopup, setActivePopup] = useState(null);

  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleButtonClick = (type) => {
    setActivePopup(activePopup === type ? null : type);
  };

  const handleInputChange = (e) => {
    console.log(`Input for ${activePopup}:`, e.target.value);
  };

  return (
    <div className={`chat-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <aside className={`sidebar ${isSidebarOpen ? '' : 'closed'}`} aria-label="Sidebar">
        {/* Sidebar content can be added here */}
      </aside>
      <main className="chat-window">
        <h1 className="header-text">{/* Chat title goes here */}</h1>
        <section className="chat-body">
          {/* Chat messages go here */}
        </section>
        <footer className="chat-footer">
          <div className="control-center">
          <div className="button-wrapper">
              <button
                className="control-button location"
                aria-label="Show location"
                onClick={() => handleButtonClick('location')}
              />
              {activePopup === 'location' && (
                <div className="popup-blob">
                  <input type="location" onChange={handleInputChange} />
                </div>
              )}
            </div>
            <div className="button-wrapper">
              <button
                className="control-button time"
                aria-label="Show time"
                onClick={() => handleButtonClick('time')}
              />
              {activePopup === 'time' && (
                <div className="popup-blob">
                  <input type="time" onChange={handleInputChange} />
                </div>
              )}
            </div>
            <div className="button-wrapper">
              <button
                className="control-button date"
                aria-label="Show date"
                onClick={() => handleButtonClick('date')}
              />
              {activePopup === 'date' && (
                <div className="popup-blob">
                  <input type="date" onChange={handleInputChange} />
                </div>
              )}
            </div>
            <div className="button-wrapper">
              <button
                className="control-button write"
                aria-label="Write message"
                onClick={() => handleButtonClick('write')}
              />
              {activePopup === 'write' && (
                <div className="popup-blob">
                  <textarea placeholder="Write your message..." onChange={handleInputChange} />
                </div>
              )}
            </div>
          </div>
          <button className="submit" aria-label="send message">generate</button>
        </footer>
      </main>
      <button
        className="sidebar-button home"
        onClick={() => navigate('/')}
        aria-label="Go to home page"
      />
      <button
        className="sidebar-button toggle"
        onClick={toggleSidebar}
        aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
      />
    </div>
  );
}

export default Chat;
