import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { login } from '../../Functions/auth';


export default function Login() {
  const [userLogin, setUserLogin] = useState({
    email: '',
    password: '',
    remember: false
  });


  const handleLogin = async (userLogin) => {
    const res = await login(userLogin);
  };


  return (
    <div className="flex flex-col justify-around">
      <form onSubmit={handleLogin}>
      </form>

      <Link to="/register">Pas de compte</Link>
    </div>
  );
};
