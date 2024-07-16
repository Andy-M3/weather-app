import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Card, CardContent, Grid } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import GrainIcon from '@mui/icons-material/Grain';
import CloudIcon from '@mui/icons-material/Cloud';
import StormIcon from '@mui/icons-material/Thunderstorm';

function WeatherForecast({ weatherData }) {
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    const fetchForecastData = async () => {
      const apiKey = '87d82b9c61db60eb16fded30cd2e27da';  // Ваш API-ключ OpenWeather
      const { coord } = weatherData;
      const { lat, lon } = coord;

      try {
        const response = await axios.get(
          `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
        );
        setForecast(response.data.list.filter((_, index) => index % 8 === 0));  // Данные каждые 24 часа
      } catch (error) {
        console.error('Ошибка при запросе данных прогноза:', error);
      }
    };

    fetchForecastData();
  }, [weatherData]);

  if (!forecast) {
    return null;
  }

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

  return (
    <Grid container spacing={2} sx={{ mt: 3 }}>
      <Grid item xs={12}>
        <Typography variant="h5">5-Day Forecast</Typography>
      </Grid>
      {forecast.map((day, index) => (
        <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
          <Card sx={{ backgroundColor: '#e3f2fd', animation: 'fadeIn 1s' }}>
            <CardContent>
              <Typography variant="body2">
                {new Date(day.dt * 1000).toLocaleDateString()}
              </Typography>
              {getWeatherIcon(day.weather[0].main.toLowerCase())}
              <Typography variant="body2">
                {day.weather[0].description}
              </Typography>
              <Typography variant="body2">
                Temp: {(day.main.temp - 273.15).toFixed(2)}°C
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default WeatherForecast;
