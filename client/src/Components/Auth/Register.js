import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { register } from '../../Functions/auth';


export default function Register() {
  const [userRegister, setUserRegister] = useState({
    email: '',
    password: '',
    passcheck: ''
  });


  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await register(userRegister);
    if (!res.success) return toast(res, {type: 'error'});

    console.log(res);
    // Add loading state for button + switch to Material UI
  };


  return (
    <div className="flex flex-col justify-around items-center">
      <form className="flex flex-col items-center" onSubmit={handleRegister}>
        <div className="mb-6 w-fit">
          <label className="pl-2 text-gray-700 text-sm font-medium mb-2" htmlFor="title">
            Adresse email
          </label>

          <div className="flex items-center">
            <input
              placeholder="prénom.nom"
              value={userRegister.email}
              className="border-2 rounded-sm w-full py-2 px-3 text-gray-700"
              onChange={e => setUserRegister({...userRegister, email: e.target.value})}
            />
            <p>@supinfo.com</p>
          </div>
        </div>

        <input
          type="password"
          placeholder="••••••••"
          value={userRegister.password}
          className="border-2 rounded-sm w-full py-2 px-3 text-gray-700"
          onChange={e => setUserRegister({...userRegister, password: e.target.value})}
        />

        <input
          type="password"
          placeholder="••••••••"
          value={userRegister.passcheck}
          className="border-2 rounded-sm w-full py-2 px-3 text-gray-700"
          onChange={e => setUserRegister({...userRegister, passcheck: e.target.value})}
        />

        <button type="submit" className="
          flex items-center rounded-sm text-sm px-2 py-1 ease-in-out duration-300
          focus:ring-2 focus:ring-violet-300 bg-violet-600 hover:bg-violet-700 text-white
        ">
          <span className="material-icons pr-2">save</span>CRÉER MON COMPTE
        </button>
      </form>

      <Link to="/login">Déjà un compte</Link>
    </div>
  );
};
