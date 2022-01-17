import React from 'react';
import { Navigate, Route, Routes } from 'react-router';

import Login from '../Components/Auth/Login';
import Register from '../Components/Auth/Register';

import HomeList from '../Components/Home/List';
import RandomGif from '../Components/Home/Random';


export default function LoggedOutRoutes() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<HomeList/>}/>

        <Route path="random" element={<RandomGif/>}/>

        <Route path="login" element={<Login/>}/>

        <Route path="register" element={<Register/>}/>

        <Route path="submit" element={<Navigate replace to="/login"/>}/>
      </Route>

      {/* Redirect to home page if route doesn't exist */}
      <Route element={<Navigate replace to="/"/>}/>
    </Routes>
  );
}
