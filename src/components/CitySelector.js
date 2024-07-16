import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import LocationCityIcon from '@mui/icons-material/LocationCity';

const cities = ['New York', 'London', 'Tokyo', 'Moscow', 'Sydney'];

function CitySelector({ onCityChange }) {
  const handleChange = (e) => {
    onCityChange(e.target.value);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={2} sx={{ maxWidth: '600px', margin: '0 auto' }}>
      <LocationCityIcon color="primary" sx={{ mr: 1 }} />
      <FormControl fullWidth variant="outlined">
        <InputLabel id="city-label">Select a city</InputLabel>
        <Select labelId="city-label" id="city" label="Select a city" onChange={handleChange}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {cities.map((city) => (
            <MenuItem key={city} value={city}>
              {city}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default CitySelector;
