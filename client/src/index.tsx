import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './Composants/Redux/store'
import { Provider } from 'react-redux'
import store from './Composants/Redux/store';
import { getTiers } from './Composants/Redux/Reducers/tiers';
import { getUsers } from './Composants/Redux/Reducers/user';
import { getDevis } from './Composants/Redux/Reducers/devis';
import { getFacture } from './Composants/Redux/Reducers/facture';
import { getLigne } from './Composants/Redux/Reducers/ligne';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(getTiers())
store.dispatch(getUsers())
store.dispatch(getDevis())
store.dispatch(getFacture())

store.dispatch(getLigne())

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);