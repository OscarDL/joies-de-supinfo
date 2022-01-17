export const apiUrl = process.env.NODE_ENV === 'production' ? '/api/v1/' : 'https://localhost:9000/api/v1/';

export const config = {
  headers: {
    'Content-Type': 'application/json',
    'Client-Token': process.env.REACT_APP_API_KEY
  },
  credentials: 'include',
  withCredentials: true
};
