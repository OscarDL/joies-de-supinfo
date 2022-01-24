import axios from 'axios';

import { apiUrl, config } from '../Shared/config';


export const getUserData = async () => {
  try {
    const { data } = await axios.get(apiUrl + 'user/data', config);

    return data.success ? data : data?.error;

  }

  catch (error) {
    localStorage.removeItem('signedIn'); return error;
  }
};


export const logout = async () => {
  try {
    const { data } = await axios.get(apiUrl + 'user/logout', config);

    return data;

  }

  catch (error) {
    return error.response?.data?.error || 'error';
  }
};


export const getProfile = async (id) => {
  try {
    const { data } = await axios.get(apiUrl + 'user/profile/' + id, config);

    return data.success ? data : data?.error;

  }

  catch (error) {
    return error.response?.data?.error || 'error';
  }
};


const imgurConfig = {
  headers: {
    'Authorization': 'Client-ID ' + process.env.REACT_APP_IMGUR_CLIENT_ID,
  },
};

export const postGifToImgur = async (image) => {
  try {
    const { data } = await axios.post('https://api.imgur.com/3/image', image, imgurConfig);

    return data.success ? data : data?.error;
  }

  catch (error) {
    return error.response?.data?.data?.error || 'error';
  }
};
