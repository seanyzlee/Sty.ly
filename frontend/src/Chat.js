import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Chat.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faVolumeHigh,
  faWrench,
  faClockRotateLeft,
  faMaximize,
  faMinimize,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';

function Chat() {
  const navigate = useNavigate();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isFilled, setIsFilled] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const toggleHeart = () => {
    setIsFilled(!isFilled);
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      if (document.fullscreenElement) {
        setIsFullScreen(true);
      } else {
        setIsFullScreen(false);
      }
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  const handleHomeClick = () => {
    navigate('/');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleExpandClick = () => {
    if (isFullScreen) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  const goToSignIn = () => {
    navigate('/sign-in');
  };

  const handleWrenchClick = () => {
    setIsPopupVisible(true);
    setTimeout(() => setIsPopupVisible(false), 3000); // Hide popup after 3 seconds
  };

  return (
    <div className={`container-chat ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <aside className={`sidebar ${isSidebarOpen ? '' : 'sidebar-closed'}`} aria-label="Sidebar">
        {/* Sidebar content can be added here */}
      </aside>
      <header className="header">
        <div className="top">
          <h1>sty.ly</h1>
          <div className="account">
            <button className="header-button" onClick={handleHomeClick}>
              <FontAwesomeIcon icon={faHouse} />
            </button>
            <button className="header-button" onClick={goToSignIn}>
              <FontAwesomeIcon icon={faUser} />
            </button>
          </div>
        </div>
        <div className="button-container">
          <div className="weather-buttons">
            <button>summary</button>
            <button>precipitation</button>
            <button>temperature</button>
            <button>humidity</button>
          </div>
          <div className="control-buttons">
            <button className="header-button" onClick={toggleHeart}>
              <FontAwesomeIcon icon={isFilled ? faHeartSolid : faHeartRegular} />
            </button>
            <button className="header-button">
              <FontAwesomeIcon icon={faVolumeHigh} />
            </button>
            <button className="header-button" onClick={handleWrenchClick}>
              <FontAwesomeIcon icon={faWrench} />
            </button>
            <button className="header-button" onClick={handleExpandClick}>
              <FontAwesomeIcon icon={isFullScreen ? faMinimize : faMaximize} />
            </button>
          </div>
        </div>
      </header>

      <button
        style={{ color: '#9adfee' }}
        className="sidebar-button toggle"
        onClick={toggleSidebar}
        aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        <FontAwesomeIcon icon={faClockRotateLeft} />
      </button>

      {isPopupVisible && (
        <div className="popup">
          no current updates available. stay tuned :)
        </div>
      )}

      <div className="model">
        {/* Model content goes here */}
      </div>

      <button style={{ fontSize: '32px' }} className="spotify-button">
        <FontAwesomeIcon icon={faSpotify} />
      </button>
    </div>
  );
}

export default Chat;
