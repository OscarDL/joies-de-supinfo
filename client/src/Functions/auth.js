import axios from 'axios';

import { apiUrl, config } from '../Shared/config';


export const login = async (user, remember) => {
  try {
    const {data} = await axios.post(apiUrl + 'user/login', {user, remember}, config);

    return data.success ? data : data?.error;

  } catch (error) { return error.response?.data?.error || 'error'; }
};


export const logout = async () => {
  try {
    const {data} = await axios.get(apiUrl + 'user/logout', config);

    return data;

  } catch (error) { return error.response?.data?.error || 'logout'; }
};


export const forgotPw = async (email, lang) => {
  try {
    const {data} = await axios.post(apiUrl + 'user/forgot', {email, lang}, config);

    return data.success ? data : data?.error;
    
  } catch (error) { return error.response?.data?.error || 'error'; }
};


export const resetPw = async ({password, passcheck, code}) => {
  try {
    const {data} = await axios.put(apiUrl + 'user/reset/' + code.replace(' ', ''), {password, passcheck}, config);

    return data.success ? data : data?.error;
    
  } catch (error) { return error.response?.data?.error || 'error'; }
};
