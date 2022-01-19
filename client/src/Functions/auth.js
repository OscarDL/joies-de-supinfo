import axios from 'axios';

import { apiUrl, config } from '../Shared/config';


export const login = async (userLogin) => {
  try {
    const { data } = await axios.post(apiUrl + 'auth/login', userLogin, config);

    return data.success ? data : data?.error;

  } catch (error) { return error.response?.data?.error || 'error'; }
};


export const register = async (userRegister) => {
  try {
    const { data } = await axios.post(apiUrl + 'auth/register', userRegister, config);

    return data.success ? data : data?.error;

  } catch (error) { return error.response?.data?.error || 'error'; }
};


export const activate = async (code) => {
  try {
    const { data } = await axios.put(apiUrl + 'auth/activate/' + code, {}, config);

    return data.success ? data : data?.error;

  } catch (error) { return error.response?.data?.error || 'error'; }
};


export const forgotPw = async (email, lang) => {
  try {
    const { data } = await axios.post(apiUrl + 'auth/forgot', {email, lang}, config);

    return data.success ? data : data?.error;
    
  } catch (error) { return error.response?.data?.error || 'error'; }
};


export const resetPw = async ({password, passcheck, code}) => {
  try {
    const { data } = await axios.put(apiUrl + 'auth/reset/' + code.replace(' ', ''), {password, passcheck}, config);

    return data.success ? data : data?.error;
    
  } catch (error) { return error.response?.data?.error || 'error'; }
};
