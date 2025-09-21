import axios from 'axios';

// Change the port if your Flask backend runs elsewhere
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 5000,
});

export default {
  // GET /api/locations
  getLocations: () => api.get('/locations/'),

  // POST /api/predict
  predict: (payload) => api.post('/predict/', payload),

  // POST /api/send-alert
  sendAlert: (payload) => api.post('/send-alert/', payload),

  // GET /api/elevation/:lat/:lon
  getElevation: (lat, lon) => api.get(`/elevation/${lat}/${lon}`),
};
