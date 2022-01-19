import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Post from '../Components/Home/Post';
import HomeList from '../Components/Home/List';
import RandomGif from '../Components/Home/Random';
import SubmitGif from '../Components/Home/Submit';


export default function LoggedOutRoutes() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<HomeList/>}/>

        <Route path="post/:id" element={<Post/>}/>

        <Route path="random" element={<RandomGif/>}/>

        <Route path="submit" element={<SubmitGif/>}/>
      </Route>

      {/* Redirect to home page if route doesn't exist */}
      <Route path="*" element={<Navigate replace to="/"/>}/>
    </Routes>
  );
}
