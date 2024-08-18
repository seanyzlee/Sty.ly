import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Chat.css';
import outfit from './images/outfit.png'; // Initial outfit image
import outfit2 from './images/outfit2.png'; // New outfit image
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faVolumeHigh,
  faVolumeXmark,
  faWrench,
  faClockRotateLeft,
  faMaximize,
  faMinimize,
  faUser,
  faShirt,
} from '@fortawesome/free-solid-svg-icons';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function Chat() {
  const navigate = useNavigate();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [summary, setSummary] = useState('');
  const [precipitation, setPrecipitation] = useState('');
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [weatherSong, setWeatherSong] = useState('');
  const [isSpotifySidebarVisible, setIsSpotifySidebarVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [outfitImage, setOutfitImage] = useState(outfit); // Initial outfit image
  const [outfitDescription, setOutfitDescription] = useState([
    'classic baseball cap – stylish and functional, provides shade and adds a touch of classic charm to your outfit on sunny days.',
    'stylish sunglasses – high-quality lenses to protect your eyes while enhancing your look with a modern flair.',
    'leather jacket – a timeless piece that combines ruggedness with sophistication, offering warmth and an edgy aesthetic.',
    'pleated skirt – gracefully flows with every step, providing an elegant silhouette and versatile styling options for any occasion.',
    'black leather heels – elegantly designed to elevate your style, featuring a sleek, polished finish that complements both casual and formal attire.',
  ]);

  const weatherSongs = {
    Sunny: "https://open.spotify.com/embed/artist/1tCFyVMKDPW0AuVH2wLwon?utm_source=generator",
    Rain: "https://open.spotify.com/embed/playlist/47S4MBG0EEXwA0GdJUA4Ur?utm_source=generator",
    Snow: "https://open.spotify.com/embed/playlist/3AndBZRL0O0tpSBKurlBAD?utm_source=generator"
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5050/getLatestWeather');
        const data = response.data;
        setTemperature(data[0].Temperature);
        setPrecipitation(data[0].PrecipitationType);
        setHumidity(data[0].Humidity);
        setSummary(data[0].Summary);

        const weatherCondition = data[0].PrecipitationType;
        setWeatherSong(weatherSongs[weatherCondition] || weatherSongs['Sunny']); // Default to Sunny if no match
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, [weatherSongs]);

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

  const handleSpotifyClick = () => {
    setIsSpotifySidebarVisible(!isSpotifySidebarVisible);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleShirtClick = () => {
    setOutfitImage(outfit2); // Change image
    setOutfitDescription([
      'turtle neck short sleeve – comfortable and stylish, perfect for layering and keeping warm on cooler days. Its soft fabric adds a cozy touch to any ensemble.',
      'leather coat mid-thigh – offers a sleek and sophisticated look while providing extra warmth and enhancing both comfort and coverage.',
      'denim skirt – versatile and classic, easy to dress up or down for various occasions as it effortlessly with different accessories.',
      'y2k belt – adds a touch of retro flair, complementing modern outfits with a nostalgic twist of the 2000s.',
      'knee high heeled boots – stylish and elongating, ideal for both formal and casual wear while offering practical comfort and support.'
    ]); // Update description
  };

  return (
    <div className={`container-chat ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <aside className={`sidebar ${isSidebarOpen ? '' : 'sidebar-closed'}`} aria-label="Sidebar">
        {weatherSong && (
          <iframe
            style={{ borderRadius: '12px', marginTop: '56rem', marginLeft: '0.5rem' }}
            src={weatherSong}
            width="90%"
            height="100"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Weather Song"
          />
        )}
      </aside>
      <header className="header">
        <div className="top">
          <h1>sty.ly 💭</h1>
          <div className="account">
            <button className="header-button" onClick={handleHomeClick}>
              <FontAwesomeIcon icon={faHouse} />
            </button>
            <button className="header-button" onClick={goToSignIn}>
              <FontAwesomeIcon icon={faUser} />
            </button>
          </div>
        </div>

        <div className="weather-controls">
          <div className="weather-buttons">
            <div className="weather-data">
              <button>summary</button>
              <p>{summary}</p>
            </div>
            <div className="weather-data">
              <button>precipitation</button>
              <p>{precipitation ? precipitation : 'Sunny'}</p>
            </div>
            <div className="weather-data">
              <button>temperature</button>
              <p>{temperature}°C</p>
            </div>
            <div className="weather-data">
              <button>humidity</button>
              <p>{humidity * 100}%</p>
            </div>
          </div>

          <div className="control-buttons">
            <button className="header-button" onClick={toggleHeart}>
              <FontAwesomeIcon icon={isFilled ? faHeartSolid : faHeartRegular} />
            </button>
            <button className="header-button" onClick={toggleMute}>
              <FontAwesomeIcon icon={isMuted ? faVolumeXmark : faVolumeHigh} />
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

      <div className="model" style={{ marginBottom: isSpotifySidebarVisible ? '120px' : '60px' }}>
        <img src={outfitImage} style={{ width: '175px', height: 'auto', borderRadius: '15px' }} alt="Outfit" className="outfit-image" />
        <div className="outfit-description">
          {outfitDescription.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </div>
        <button onClick={handleShirtClick} className="shirt-button" style={{right:'20px'}}>
        <FontAwesomeIcon icon={faShirt} />
      </button>
      </div>

      <div className="spotify-container">
        <button
          style={{ fontSize: '35px' }}
          className="spotify-button"
          onClick={handleSpotifyClick}
        >
          <FontAwesomeIcon icon={faSpotify} />
        </button>
        {isSpotifySidebarVisible && (
          <div className="spotify-sidebar">
            <iframe
              src={weatherSong}
              allow="encrypted-media"
              title="Spotify Playlist"
              style={{ borderRadius: '12px', width: '300px', height: '80px' }} // Adjust size as needed
            ></iframe>
          </div>
)}

    </div>
    </div>
  );
}

export default Chat;
