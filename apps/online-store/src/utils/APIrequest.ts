import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3333' });

export const getData = async (endPoint: string) => {
  try {
    const res = await API.get(endPoint);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};
