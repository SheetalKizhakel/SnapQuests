//GEOCODING PERFORMED HERE USING OPENWEATHER MAP API INSTEAD OF GOOGLE API

const axios = require('axios');
const HttpError = require('../models/http-error');

const API_KEY = '667bb4068fc8c970146380vkpf8869c';

async function getCoordsForAddress(address) {
  const response = await axios.get(`https://geocode.maps.co/search?q=${encodeURIComponent(address)}&api_key=${API_KEY}`);
console.log(response)
  const data = response.data;
  if (!data || data.length === 0) {
    throw new HttpError('Could not find location for the specified address', 422);
  }

  const coordinates = {
    lat: data[0].lat,
    lng: data[0].lon
  };

  return coordinates;
}

module.exports = getCoordsForAddress;
