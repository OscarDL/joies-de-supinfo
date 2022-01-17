import { useEffect } from 'react';
import { SyncLoader } from 'react-spinners';
import { BrowserRouter as Router } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import { Slide, ToastContainer } from 'react-toastify';

import './App.css';
import Header from './Shared/Header';
import { logout } from '../Functions/auth';
import { getUserData } from '../Functions/user';
import { useAppContext } from '../Context/Provider';
import LoggedInRoutes from '../Routes/LoggedInRoutes';
import LoggedOutRoutes from '../Routes/LoggedOutRoutes';


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
    <div className="h-full" id="app">
      <Router>
        {user ? (
          <div className="container mx-auto p-5 flex flex-col h-full">
            <Header/>

            <main className="overflow-auto flex justify-center flex-grow bg-white rounded-b gap-4">
              {user._id ? <LoggedInRoutes/> : <LoggedOutRoutes/>}
            </main>
          </div>
        ) : (
          <div className="flex items-center">
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
