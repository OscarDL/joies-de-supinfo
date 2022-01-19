import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { SyncLoader } from 'react-spinners';
import React, { useEffect, useState } from 'react';

import { login } from '../../Functions/auth';
import { useAppContext } from '../../Context/Provider';


export default function Login() {
  const [,dispatch] = useAppContext();
  const [loading, setLoading] = useState(false);
  const [userLogin, setUserLogin] = useState({
    email: '',
    password: '',
    remember: false
  });


  const handleSetEmail = (e) => {
    let email = e.target.value;
    if (email.includes('@')) email = email.split('@')[0];

    setUserLogin({...userLogin, email});
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await login(userLogin);
    setLoading(false);

    if (!res.success) return toast(res, {type: 'error'});

    dispatch({ type: 'SET_USER', user: res.user });
  };


  useEffect(() => {
    document.title = 'JDS - Connexion';
  }, []);


  return (
    <div className="flex flex-col justify-around items-center h-full">
      <form className="flex flex-col items-stretch gap-3" onSubmit={handleLogin}>
        <div>
          <label className="pl-2 text-gray-700 text-sm font-medium mb-2" htmlFor="email">
            Adresse email
          </label>

          <div className="flex items-center">
            <input
              id="email"
              name="jds-email"
              value={userLogin.email}
              autoComplete="jds-email"
              onChange={handleSetEmail}
              placeholder="prénom.nom | XXXXXX"
              className="border-2 rounded w-full py-2 px-3 text-gray-700"
            />
            <p>@supinfo.com</p>
          </div>
        </div>

        <div>
          <label className="pl-2 text-gray-700 text-sm font-medium mb-2" htmlFor="password">
            Mot de passe
          </label>

          <input
            id="password"
            type="password"
            name="jds-password"
            placeholder="••••••••"
            value={userLogin.password}
            autoComplete="jds-password"
            className="border-2 rounded w-full py-2 px-3 text-gray-700"
            onChange={e => setUserLogin({...userLogin, password: e.target.value})}
          />
        </div>

        <div className="flex items-center">
          <input
            id="remember"
            type="checkbox"
            className="mx-1"
            value={userLogin.remember}
            style={{accentColor: '#7c3aed'}}
            onChange={e => setUserLogin({...userLogin, remember: e.target.checked})}
          />

          <label className="text-gray-700 text-sm select-none" htmlFor="remember">
            Se souvenir de moi
          </label>
        </div>

        <button type="submit" disabled={loading} className="
          flex self-center items-center rounded text-sm px-2 py-1 ease-in-out duration-300 mt-4
          focus:ring-2 focus:ring-violet-300 bg-violet-600 hover:bg-violet-700 text-white bg-opacity-90
        ">
          {loading ? (
            <SyncLoader color="white" css="transform:scale(0.5)"/>
          ) : (
            <><span className="material-icons-outlined pr-2 scale-90">lock</span>CONNEXION</>
          )}
        </button>
      </form>

      <Link to="/register" className="hover:underline focus:underline">Je n'ai pas de compte</Link>
    </div>
  );
};
