import React from 'react';
import { Link } from 'react-router-dom';

import { logout } from '../../Functions/user';
import { useAppContext } from '../../Context/Provider';


export default function Header() {
  const [{user}] = useAppContext();


  const handleLogout = () => {
    logout().then(() => window.location.reload());
  };


  return (
    <header className="rounded-t bg-cover bg-no-repeat">
      <div className="relative rounded-t flex justify-between gap-2 px-5 py-4 text-white flex-col md:flex-row">
        <div className="flex gap-4 flex-grow">
          <Link to="/" className="grid place-items-center">
            <img className="max-h-16 max-w-16" src="/assets/icon.png" alt="icon"/>
          </Link>

          <div id="title" className="flex flex-col gap-1 font-thin">
            <h1 className="text-2xl">
              <Link to="/">
                Les Joies de SUPINFO
              </Link>
            </h1>

            <h2 className="text-sm leading-4 max-w-fit">Les situations de la vie quotidienne des étudiants de SUPINFO</h2>
          </div>
        </div>

        <div className="flex justify-end items-start gap-3">
          <Link to="/random" className="
            bg-opacity-20 bg-gray-600
            hover:bg-opacity-30 hover:bg-gray-700
            focus:ring-2 focus:ring-opacity-50 focus:ring-gray-300
            flex items-center rounded text-sm px-2 py-1 duration-300
          ">
            <span className="material-icons pr-1">shuffle</span>AU HASARD
          </Link>

          <Link to="/submit" className="
            flex items-center rounded text-sm px-2 py-1 duration-300
            focus:ring-2 focus:ring-violet-300 bg-violet-600 hover:bg-violet-700
          ">
            <span className="material-icons pr-1">add</span>PROPOSER UN GIF
          </Link>

          {!user._id ? (
            <Link to="/login">
              <span className="
                material-icons-outlined transition duration-300
                hover:bg-opacity-80 hover:bg-green-600 rounded p-1
              ">
                login
              </span>
            </Link>
          ) : (
            <span onClick={handleLogout} className="
              material-icons-outlined cursor-pointer transition duration-300
              hover:bg-opacity-80 hover:bg-orange-600 rounded p-1
            ">
              logout
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
