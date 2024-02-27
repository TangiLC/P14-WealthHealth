import axios from 'axios';

export const fetchList = () => {
  return axios.get('http://localhost:3003/getAllEmployees/');
};