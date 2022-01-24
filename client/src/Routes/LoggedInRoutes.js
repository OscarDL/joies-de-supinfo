import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Post from '../Components/Home/Post';
import Posts from '../Components/Home/Posts';
import Profile from '../Components/Home/Profile';
import RandomGif from '../Components/Home/Random';
import SubmitGif from '../Components/Home/Submit';


export default function LoggedOutRoutes() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Posts/>}/>

        <Route path="post/:id" element={<Post/>}/>

        <Route path="random" element={<RandomGif/>}/>

        <Route path="submit" element={<SubmitGif/>}/>

        <Route path="profile/:id" element={<Profile/>}/>
      </Route>

      {/* Redirect to home page if route doesn't exist */}
      <Route path="*" element={<Navigate replace to="/"/>}/>
    </Routes>
  );
}
