import { useEffect } from 'react';
import { SyncLoader } from 'react-spinners';
import { BrowserRouter as Router } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import { Slide, ToastContainer } from 'react-toastify';

import './App.css';
import Header from './Shared/Header';
import { logout } from '../Functions/user';
import { getUserData } from '../Functions/user';
import { useAppContext } from '../Context/Provider';
import LoggedInRoutes from '../Routes/LoggedInRoutes';
import LoggedOutRoutes from '../Routes/LoggedOutRoutes';

import TimeAgo from 'javascript-time-ago';
import fr from 'javascript-time-ago/locale/fr.json';

TimeAgo.addDefaultLocale(fr);


export default function App() {
  const [{user}, dispatch] = useAppContext();

  useEffect(() => {
    if (!user) {
      getUserData().then(res => {
        if (!res.success)
          logout().then(() => dispatch({ type: 'SET_USER', user: {} }));

        else
          dispatch({ type: 'SET_USER', user: res.user });
      });
    }
  }, [user, dispatch]);


  return (
    <div className="w-full h-full" id="app">
      <Router>
        {user ? (
          <div className="container mx-auto p-5 flex flex-col h-full">
            <Header/>

            <main className="relative overflow-auto grid flex-grow place-items-center bg-white rounded-b gap-4 py-4">
              {user._id ? <LoggedInRoutes/> : <LoggedOutRoutes/>}
            </main>
          </div>
        ) : (
          <div className="h-full grid place-items-center">
            <SyncLoader color="#7c3aed"/>
          </div>
        )}

        <ToastContainer
          draggable
          closeOnClick
          pauseOnHover
          autoClose={3000}
          transition={Slide}
        />
      </Router>
    </div>
  );
};
