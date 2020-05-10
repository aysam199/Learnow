import axios from 'axios';

const checkResponse = response => {
  if (response.status !== 200) {
    console.log(`Error with the request! ${response.status}`);
    return;
  }
  return response;
};
const axiosGet = url => {
  let apiUrl = 'http://localhost:5000';
  if (process.env.NODE_ENV === 'production') {
    apiUrl = 'https://learnow-be.herokuapp.com';
  }
  const config = {
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json;charset=utf-8',
    },
  };
  return axios
    .get(apiUrl + url, config)
    .then(checkResponse)
    .catch(error => {
      throw new Error(`Could not get data , error:${error}`);
    });
};

export default axiosGet;