import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { SyncLoader } from 'react-spinners';
import React, { useEffect, useState } from 'react';

import { register } from '../../Functions/auth';


export default function Register() {
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [userRegister, setUserRegister] = useState({
    email: '',
    password: '',
    passcheck: ''
  });


  const handleSetEmail = (e) => {
    let email = e.target.value;
    if (email.includes('@')) email = email.split('@')[0];

    setUserRegister({...userRegister, email});
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await register(userRegister);
    setLoading(false);

    if (!res.success) return toast(res, {type: 'error'});

    setRegistered(true);
    toast('Compte créé avec succès.', {type: 'success'});
  };


  useEffect(() => {
    document.title = 'JDS - Création de compte';
  }, []);


  return (
    <div className="flex flex-col justify-around items-center h-full">
      {registered ? (
        <div className="grid place-items-center">
          <h1 className="text-3xl mb-12">Votre compte a été créé mais n'est pas activé.</h1>
          <p className="text-md">Un email vous a été envoyé pour l'activer et éviter le contenu spam / néfaste.</p>
        </div>
      ) : (<>
        <form className="flex flex-col items-stretch gap-3" onSubmit={handleRegister}>
          <div>
            <label className="pl-2 text-gray-700 text-sm font-medium mb-2" htmlFor="email">
              Adresse email
            </label>

            <div className="flex items-center">
              <input
                id="email"
                name="jds-email"
                autoComplete="jds-email"
                onChange={handleSetEmail}
                value={userRegister.email}
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
              value={userRegister.password}
              autoComplete="jds-new-password"
              className="border-2 rounded w-full py-2 px-3 text-gray-700"
              onChange={e => setUserRegister({...userRegister, password: e.target.value})}
            />
          </div>

          <div>
            <label className="pl-2 text-gray-700 text-sm font-medium mb-2" htmlFor="passcheck">
              Retapez le mot de passe
            </label>

            <input
              id="passcheck"
              type="password"
              placeholder="••••••••"
              value={userRegister.passcheck}
              autoComplete="jds-new-password"
              className="border-2 rounded w-full py-2 px-3 text-gray-700"
              onChange={e => setUserRegister({...userRegister, passcheck: e.target.value})}
            />
          </div>

          <button type="submit" disabled={loading} className="
            flex self-center items-center rounded text-sm px-2 py-1 ease-in-out duration-300 mt-4
            focus:ring-2 focus:ring-violet-300 bg-violet-600 hover:bg-violet-700 text-white bg-opacity-90
          ">
            {loading ? (
              <SyncLoader color="white" css="transform:scale(0.5)"/>
            ) : (
              <><span className="material-icons pr-2">save</span>CRÉER MON COMPTE</>
            )}
          </button>
        </form>

        <Link to="/login" className="hover:underline focus:underline">J'ai déjà un compte</Link>
      </>)}
    </div>
  );
};
