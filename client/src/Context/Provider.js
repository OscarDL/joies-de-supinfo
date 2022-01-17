import React, { createContext, useContext, useReducer } from 'react';


const state = {
  user: null,
  gifs: null
};


const AppContext = createContext();

export const Provider = ({ reducer, children }) => (
  <AppContext.Provider value={useReducer(reducer, state)}>
    {children}
  </AppContext.Provider>
);


export const useAppContext = () => useContext(AppContext);
