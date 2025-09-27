import axios from 'axios';

// Change the port if your Django backend runs elsewhere
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  timeout: 5000,
});

export default {
  // GET /api/locations
  getLocations: () => api.get('/locations/'),

  // POST /api/predict
  predict: (payload) => api.post('/predict/', payload),

  // POST /api/send-alert
  sendAlert: (payload) => api.post('/send-alert/', payload, {timeout: 0}),

  // GET /api/elevation/:lat/:lon
  getElevation: (lat, lon) => api.get(`/elevation/${lat}/${lon}`),
   
  // GET /api/features/:feature/last
  getLastData: (feature) => api.get(`/features/${feature}/last`),
};

