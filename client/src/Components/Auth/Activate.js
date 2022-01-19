import { toast } from 'react-toastify';
import { SyncLoader } from 'react-spinners';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { activate } from '../../Functions/auth';


export default function Activate() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const handleActivate = async () => {
    setLoading(true);

    const res = await activate(code);
    setLoading(false);

    if (!res.success) return toast(res, {type: 'error'});

    navigate('/login');
    toast('Compte activé avec succès. Vous pouvez maintenant vous connecter.', {type: 'success'});
  };


  useEffect(() => {
    document.title = 'Activation de compte';
    // Remove the reset code from the URL bar
    window.history.pushState('', document.title, '/activate');
  }, []);


  return (
    <div className="flex flex-col justify-center items-center h-full">
      <h1 className="text-3xl mb-12">Votre compte a été créé mais n'est pas activé.</h1>

      <button onClick={handleActivate} disabled={loading} className="
        flex self-center items-center rounded text-sm px-2 py-1 ease-in-out duration-300 mt-4
        focus:ring-2 focus:ring-violet-300 bg-violet-600 hover:bg-violet-700 text-white bg-opacity-90
      ">
        {loading ? (
          <SyncLoader color="white" css="transform:scale(0.5)"/>
        ) : (
          <><span className="material-icons-outlined pr-2 scale-90">toggle_off</span>ACTIVER MON COMPTE</>
        )}
      </button>
    </div>
  );
};
