import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Card, CardContent, CircularProgress, Box } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import GrainIcon from '@mui/icons-material/Grain';
import CloudIcon from '@mui/icons-material/Cloud';
import StormIcon from '@mui/icons-material/Thunderstorm';

const getWeatherIcon = (description) => {
  switch (description) {
    case 'clear sky':
      return <WbSunnyIcon />;
    case 'snow':
      return <AcUnitIcon />;
    case 'rain':
      return <GrainIcon />;
    case 'clouds':
      return <CloudIcon />;
    case 'thunderstorm':
      return <StormIcon />;
    default:
      return <WbSunnyIcon />;
  }
};

function WeatherNow({ city, setWeatherData }) {
  const [loading, setLoading] = useState(true);
  const [currentWeather, setCurrentWeather] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      const apiKey = '87d82b9c61db60eb16fded30cd2e27da';  // Ваш API-ключ OpenWeather

      try {
        const weatherResponse = await axios.get(
          `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
        );

        setWeatherData(weatherResponse.data);
        setCurrentWeather(weatherResponse.data);
      } catch (error) {
        console.error('Ошибка при запросе данных о погоде:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [city, setWeatherData]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (!currentWeather) {
    return null;
  }

  return (
    <Card sx={{ mt: 3, backgroundColor: '#e3f2fd', animation: 'fadeIn 1s' }}>
      <CardContent>
        <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
          {getWeatherIcon(currentWeather.weather[0].main.toLowerCase())}
          <Typography variant="h5" sx={{ ml: 1 }}>Current Weather in {city}</Typography>
        </Box>
        <Typography variant="body1">
          Temperature: {(currentWeather.main.temp - 273.15).toFixed(2)}°C
        </Typography>
        <Typography variant="body1">
          Weather: {currentWeather.weather[0].description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default WeatherNow;
