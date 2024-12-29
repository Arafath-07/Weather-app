import React, { useState } from 'react'

const Weather = () => {
const [locationName, setLocationName]=useState('')// State for storing location
const [weatherData, setWeatherData] = useState(null);  // State for storing weather data
const [error, setError] = useState(null);  // State for storing errors


    const getLocationName=(e)=>{
        setLocationName(e.target.value);
    };

    const fetchWeatherData = () => {
    
        // Making the API request using the fetch method
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${locationName}&appid=8ac5c4d57ba6a4b3dfcf622700447b1e&units=metric`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Location not found!');
            }
            return response.json();  // Parse the response as JSON
          })
          .then(data => {
            setWeatherData(data);  // Update the weather data state
            setError(null);  // Clear any previous errors
          })
          .catch(err => {
            setError(err.message);  // Set error state if something goes wrong
            setWeatherData(null);  // Clear previous weather data
          });
      };
    

  return (
    <div className="weather-container">
    <div  className='d-flex justify-content-center my-5'>
<input value={locationName} onChange={getLocationName} style={{marginTop:"150px",fontFamily:"initial"}}  type="text" className='form-control w-50' placeholder='Enter Location...' />
<button onClick={fetchWeatherData} style={{marginTop:"150px",fontFamily:"initial"}} className='btn btn-primary ms-4'>Search</button>
    </div>
     {/* Display weather data if available */}
     {weatherData && (
        <div style={{fontFamily:'initial',color:'white'}} className="weather-info text-center mt-5">
          <h1 style={{fontWeight:'bolder'}}>{weatherData.name}</h1>
          <h5>Temperature: <span style={{fontSize:'30px'}}>{weatherData.main.temp}°C</span> </h5>
          <h5>Weather: <span style={{fontSize:'30px'}}>{weatherData.weather[0].description}</span> </h5>
          <h5>Humidity: <span style={{fontSize:'30px'}}>{weatherData.main.humidity}%</span> </h5>
          <h5>Wind Speed: <span style={{fontSize:'30px'}}>{weatherData.wind.speed} m/s</span> </h5>
        </div>
      )}

      {/* Display error message if any */}
      {error && <div className="error-message text-center mt-3">{error}</div>}
    </div>
  )
}

export default Weather