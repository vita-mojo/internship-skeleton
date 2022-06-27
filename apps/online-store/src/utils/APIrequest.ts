import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3333' });

export const getData = async (endPoint: string) => {
  try {
    const res = await API.get(endPoint);
    return res;
  } catch (error) {
    return error;
  }
};
