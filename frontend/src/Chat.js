import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Chat.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faVolumeHigh,
  faVolumeXmark, // New icon for muted state
  faWrench,
  faClockRotateLeft,
  faMaximize,
  faMinimize,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import {Skeleton} from 'antd';

//TODO:
// 1. Center the model image in the middle of the screen
// 2. Make sure the FIRST useEffect() hook is running only once every hour and not every time the site is refreshed
// 3. Make sure that the skeleton is displayed properly. Example is: https://ant.design/components/skeleton

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
  const [weatherSong, setWeatherSong] = useState('');
  const [isSpotifySidebarVisible, setIsSpotifySidebarVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false); // New state for mute control
  const [bgRemovedBase64Image, setBgRemovedBase64Image] = useState('');
  const [outfit, setOutfit] = useState('');

  const weatherSongs = {
    Sunny: "https://open.spotify.com/embed/artist/1tCFyVMKDPW0AuVH2wLwon?utm_source=generator",
    Rain: "https://open.spotify.com/embed/playlist/47S4MBG0EEXwA0GdJUA4Ur?utm_source=generator",
    Snow: "https://open.spotify.com/embed/playlist/3AndBZRL0O0tpSBKurlBAD?utm_source=generator"
  };


  // MAKE THIS RUN ONCE EVERY HOUR AND NOT RUN WHEN SITE IS RESTARTED
  // MAKE THIS RUN ONCE EVERY HOUR AND NOT RUN WHEN SITE IS RESTARTED
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [weatherResponse, outfitIdeaResponse, base64OutfitImage, latestBase64OutfitImage] = await Promise.all([
          // axios.get('http://localhost:5050/getLatestWeather'),
          // axios.get('http://localhost:5050/askModelOutfits'),
          // axios.get('http://localhost:5050/generateModelOutfits'),
          // axios.get('http://localhost:5050/getLatestBased64Image')

        ]);
  
        const data = weatherResponse.data;
        const outfitIdeaData = outfitIdeaResponse.data;
        const base64Image = latestBase64OutfitImage.data;

  
        console.log('Data: ', data);
        console.log('Outfit Idea: ', outfitIdeaData);
        console.log('Base64 Image: ', base64Image);

        setOutfit(outfitIdeaData.output);
        setTemperature(data[0].Temperature);
        setPrecipitation(data[0].PrecipitationType);
        setHumidity(data[0].Humidity);
        setSummary(data[0].Summary);
        setBgRemovedBase64Image(base64Image[0].base64Image);
  
  
        const weatherCondition = data[0].PrecipitationType;
        setWeatherSong(weatherSongs[weatherCondition] || weatherSongs['Sunny']); // Default to Sunny if no match
      } catch (error) {
        console.error('Error fetching data: ', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    // Run fetchData immediately
    fetchData();
  
    // Set interval to run fetchData every hour (3600000 milliseconds)
    const intervalId = setInterval(fetchData, 3600000);
  
    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this runs only once

  const toggleHeart = () => {
    setIsFilled(!isFilled);
  };
  
  async function handleRefresh() {
    try{
      setIsLoading(true);
      await axios.get('http://localhost:5050/generateModelOutfits')
      const response = await axios.get('http://localhost:5050/getLatestBased64Image');
      const base64Image = response.data;
      await setBgRemovedBase64Image(base64Image[0].base64Image);
      console.log('Base64 Image: ', base64Image);
      await setIsLoading(false);

    } catch (error) {
      console.error('Error fetching data: ', error);      
    }

  }

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

  if (isLoading) {
    return <Skeleton height="100vh" width="100%" />;
  }

  return (
    <div className={`container-chat ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <aside className={`sidebar ${isSidebarOpen ? '' : 'sidebar-closed'}`} aria-label="Sidebar">
       
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

            <div className="weather-data">
              <button>outfit recommendation</button>
              <p>{outfit}</p>
            </div>
          </div>

          <div className='refresh-button'>

            <button className="header-button" onClick={handleRefresh}>refresh</button>
            
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

    
    
    
      {isPopupVisible && (
        <div className="popup">
          no current updates available. stay tuned :)
        </div>
      )}

      <div className="model" style={{ marginBottom: isSpotifySidebarVisible ? '120px' : '60px' }}>
      <div>
  {bgRemovedBase64Image && (
    <img 
      src={`data:image/png;base64,${bgRemovedBase64Image}`}  
      style={{zIndex: 1, marginBottom: '100px', marginRight: '200px'}} 
      width="100%" 
      height="0%" 
    />
  )}
</div>
     
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
    )
}

export default Chat;
