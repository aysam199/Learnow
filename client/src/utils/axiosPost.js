import axios from 'axios';

const checkResponse = response => {
  if (response.status !== 201) {
    console.log(`Error with the request! ${response.status}`);
    return new Error(`Server error , ${response.status}`);
  }
  return response;
};

const axiosPost = (url, data) => {
  let apiUrl = 'http://localhost:5000';
  if (process.env.NODE_ENV === 'production') {
    apiUrl = 'https://learnow-be.herokuapp.com';
  }
  const config = {
    method: 'post',
    url: apiUrl + url,
    data: data,
  };
  return axios(config)
    .then(checkResponse)
    .catch(error => {
      throw new Error(`Could not Post data , error:${error}`);
    });
};

export default axiosPost;
