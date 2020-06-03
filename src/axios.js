import axios from 'axios';

const mockAPI = axios.create({
  baseURL: 'https://5ed7e98a152c310016d85659.mockapi.io/positiontable/players',
})

export default mockAPI;