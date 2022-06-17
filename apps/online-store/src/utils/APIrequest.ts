import axios from 'axios';

export const getData = (endpoint: string) => {
  axios({
    method: 'get',
    url: `http://localhost:3333/api/${endpoint}`,
    responseType: 'stream'
  }).then((res) => console.log(res));
};

export default getData;
