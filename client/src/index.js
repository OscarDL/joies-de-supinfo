import React from 'react';
import ReactDOM from 'react-dom';

import App from './Components/App';
import { reducer } from './Context/reducer';
import { Provider } from './Context/Provider';


ReactDOM.render( // Stack of the different contexts
  <React.StrictMode>
    <Provider reducer={reducer}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
