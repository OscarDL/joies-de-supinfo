import axios from 'axios';

import { apiUrl, config } from '../Shared/config';


export const getUserData = async () => {
  try {
    const {data} = await axios.get(apiUrl + 'user/data', config);

    return data.success ? data : data?.error;

  } catch (error) { localStorage.removeItem('signedIn'); return error; }
};


export const changePw = async () => {
  try {
    const {data} = await axios.post(apiUrl + 'user/change', null, config);

    return data.success ? data : data?.error;
    
  } catch (error) { return error.response?.data?.error || 'error'; }
};


const imgurConfig = {
  headers: {
    'Authorization': 'Client-ID ' + process.env.REACT_APP_IMGUR_CLIENT_ID,
  },
};

export const postGifToImgur = async (data) => {
  try {
    const res = await axios.post('https://api.imgur.com/3/image', data, imgurConfig);

    return res.data;
  }

  catch (error) {
    return error.response?.data?.data?.error || 'error';
  }
};
