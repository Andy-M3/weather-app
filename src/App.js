import React, { useState } from 'react';
import CitySelector from './components/CitySelector';
import WeatherNow from './components/WeatherNow';
import WeatherForecast from './components/WeatherForecast';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import backgroundImage from './background.jpg';

const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f5f5f5',
      paper: '#ffffff'
    },
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
  },
});

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleCityChange = (selectedCity) => {
    setCity(selectedCity);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Container maxWidth="sm">
          <Paper elevation={3} sx={{ p: 3, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
            <Box textAlign="center" mb={2}>
              <Typography variant="h4" gutterBottom>Weather App</Typography>
            </Box>
            <CitySelector onCityChange={handleCityChange} />
            {city && <WeatherNow city={city} setWeatherData={setWeatherData} />}
            {weatherData && <WeatherForecast weatherData={weatherData} />}
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
