import axios from 'axios';

const API_BASE_URL = 'http://192.168.0.24:3001'; 

const nhlService = {
  getTeams: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/nhl/teams`);
      return response.data;
    } catch (error) {
      console.error('Error fetching NHL teams:', error);
      throw error;
    }
  },
};

export default nhlService;
