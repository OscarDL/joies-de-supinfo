import axios from 'axios';

import { apiUrl, config } from '../Shared/config';


export const getPosts = async () => {
  try {
    const { data } = await axios.get(apiUrl + 'posts', config);

    return data.success ? data : data?.error;

  } catch (error) { return error.response?.data?.error || 'error'; }
};


export const getPost = async (id) => {
  try {
    const { data } = await axios.get(apiUrl + 'posts/post/' + id, config);

    return data.success ? data : data?.error;

  } catch (error) { return error.response?.data?.error || 'error'; }
};


export const getRandomPost = async () => {
  try {
    const { data } = await axios.get(apiUrl + 'posts/random', config);

    return data.success ? data : data?.error;

  } catch (error) { return error.response?.data?.error || 'error'; }
};


export const submitPost = async (post) => {
  try {
    const { data } = await axios.post(apiUrl + 'posts', post, config);

    return data.success ? data : data?.error;

  } catch (error) { return error.response?.data?.error || 'error'; }
};


export const deletePost = async (id) => {
  try {
    const { data } = await axios.delete(apiUrl + 'posts/' + id, config);

    return data.success ? data : data?.error;

  } catch (error) { return error.response?.data?.error || 'error'; }
};
