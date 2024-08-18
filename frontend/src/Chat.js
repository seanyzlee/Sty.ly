
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
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function Chat() {
  const navigate = useNavigate();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isFilled, setIsFilled] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [summary, setSummary] = useState('');
  const [precipitation, setPrecipitation] = useState('');
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [weatherSong , setWeatherSong] = useState('');

  const weatherSongs = useState(["https://open.spotify.com/embed/artist/1tCFyVMKDPW0AuVH2wLwon?utm_source=generator", "https://open.spotify.com/embed/playlist/47S4MBG0EEXwA0GdJUA4Ur?utm_source=generator", "https://open.spotify.com/embed/playlist/3AndBZRL0O0tpSBKurlBAD?utm_source=generator" ]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5050/getLatestWeather');
        const data = response.data;
        setTemperature(data[0].Temperature);
        setPrecipitation(data[0].PrecipitationType);
        setHumidity(data[0].Humidity);
        setSummary(data[0].Summary);

        if (precipitation == 'Sunny' || precipitation == 'sunny') {
          setWeatherSong(weatherSongs[0]);
        }
        else if (precipitation == 'Rain' || precipitation == 'rain') {
          setWeatherSong(weatherSongs[1]);
        }
        else if (precipitation == 'Snow' || precipitation == 'snow') {
          setWeatherSong(weatherSongs[2]);
        }
        
   
    
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

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
        <iframe 
        style={{ borderRadius: '12px', marginTop: '56rem', marginLeft: '0.5rem' }} 
        src={weatherSong} 
        width="90%" 
        height="100" 
        allowFullScreen 
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
        loading="lazy"
      />
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
          <div className='weather-info' >
          
            <p>{summary}</p>
            <p>{precipitation ? precipitation : 'Sunny'}</p> {/* Conditional rendering */}
            <p>{temperature}°C</p>
            <p>{humidity * 100}%</p>
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

      
      
        <div>
      

        </div>
   
    </div>
  );
}

export default Chat;
