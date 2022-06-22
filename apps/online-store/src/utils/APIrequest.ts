import axios from 'axios';

<<<<<<< HEAD
export const getData = (endpoint: string) => {
  axios({
    method: 'get',
    url: `http://localhost:3333/api/${endpoint}`,
    responseType: 'stream'
  }).then((res) => console.log(res));
};

export default getData;
=======
const API = axios.create({ baseURL: 'http://localhost:3333' });

export const getData = async (endPoint: string) => {
  try {
    const res = await API.get(endPoint);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
>>>>>>> 10253f50416dda74fa884a30d80e1be648ce67db
