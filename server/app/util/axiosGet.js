const axios =  require('axios');
require ('dotenv').config();
const checkResponse = response => {
  if (response.status !== 200) {
    console.log(`Error with the request! ${response.status}`);
    return;
  }
  return response;
};
const axiosGet = url => {
  const config = {
    headers: {
      Accept: 'application/json, text/plain, */*',
      Authorization: `Basic ${process.env.REACT_APP_AUTH}`,
      'Content-Type': 'application/json;charset=utf-8',
    },
  };
  return axios
    .get(url, config)
    .then(checkResponse)
    .catch(error => {
      throw new Error(`Could not get data , error:${error}`);
    });
};

module.exports =  axiosGet;