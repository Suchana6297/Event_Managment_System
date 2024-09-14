import axios from 'axios';

const API_URL = 'https://api.example.com/events';

const eventService = {
  createEvent(eventData) {
    return axios.post(`${API_URL}`, eventData);
  },

  getEvents() {
    return axios.get(`${API_URL}`);
  },

  getEvent(id) {
    return axios.get(`${API_URL}/${id}`);
  },

  deleteEvent(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
};

export default eventService;
