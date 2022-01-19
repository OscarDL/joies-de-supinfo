import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Login from '../Components/Auth/Login';
import Register from '../Components/Auth/Register';
import Activate from '../Components/Auth/Activate';

import Posts from '../Components/Home/Posts';
import RandomGif from '../Components/Home/Random';


export default function LoggedOutRoutes() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Posts/>}/>

        <Route path="random" element={<RandomGif/>}/>

        <Route path="login" element={<Login/>}/>

        <Route path="register" element={<Register/>}/>

        <Route path="activate/:code" element={<Activate/>}/>

        <Route path="submit" element={<Navigate replace to="/login"/>}/>
      </Route>

      {/* Redirect to home page if route doesn't exist */}
      <Route path="*" element={<Navigate replace to="/"/>}/>
    </Routes>
  );
}
