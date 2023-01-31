import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UsersCreate from './Composants/UsersCreate/UsersCreate';
import Users from './Composants/Users/Users';
import Login from './Composants/Login/Login';
import Admin from './Composants/Admin/Admin';
import { userContext } from './Composants/Contexte/Contexte';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from './Composants/Menu/Menu'
import Accueil from './Composants/Accueil/Accueil';
import Commercial from './Composants/Commercial/Commercial';
import Logout from './Composants/Logout/Logout';
import CreerDevis from './Composants/Commercial/Devis/CreerDevis/CreerDevis';
import ListeDevis from './Composants/Commercial/Devis/ListeDevis/ListeDevis';
import EditDevis from './Composants/Commercial/Devis/EditDevis/EditDevis';
import Fiche from './Composants/Fiche/Fiche';
import Tiers from './Composants/Tiers/Tiers';
import CreerTiers from './Composants/Tiers/CreerTiers/CreerTiers';
import ListeTiers from './Composants/Tiers/ListeTiers/ListeTiers';

import Facturation from './Composants/Facturation/Facturation';
import ListeFacture from './Composants/Facturation/Facture/ListeFacture/ListeFacture';
import CreerFacture from './Composants/Facturation/Facture/CreerFacture/CreerFacture';
import EditFacture from './Composants/Facturation/Facture/EditFacture/EditFacture';
import EditTiers from './Composants/Tiers/EditTiers/EditTiers';

function App() {

  const [userData, setUserData] = useState<any>("")

  useEffect( ( ) => {
    axios.get('/api/user/info').then(reponse => {
       setUserData(reponse.data)
    })
  }, [])

  return (
    <div className="App">
    <userContext.Provider value={userData}>
        <Router>
          <Routes>
            <Route path='/' element={<Login></Login>}></Route>
            <Route path='/users/create' element={<><Menu></Menu><UsersCreate></UsersCreate></>}></Route>
            <Route path='/users' element={<><Menu></Menu><Users></Users></>}></Route>
            <Route path='/admin' element={<><Menu></Menu><Admin></Admin></>}></Route>
            <Route path='/accueil' element={<><Menu></Menu><Accueil></Accueil></>}></Route>
            <Route path='/logout' element={<><Menu></Menu><Logout></Logout></>}></Route>
            <Route path='/fiche' element={<><Menu></Menu><Fiche></Fiche></>}></Route>

            <Route path='/commercial' element={<><Menu></Menu><Commercial></Commercial></>}></Route>
            <Route path='/devis/creer' element={<><Menu></Menu><CreerDevis></CreerDevis></>}></Route>
            <Route path='/devis/liste' element={<><Menu></Menu><ListeDevis></ListeDevis></>}></Route>
            <Route path='/devis/edit/:id' element={<><Menu></Menu><EditDevis></EditDevis></>}></Route>

            <Route path='/tiers' element={<><Menu></Menu><Tiers></Tiers></>}></Route>
            <Route path='/nouveautiers' element={<><Menu></Menu><CreerTiers></CreerTiers></>}></Route>
            <Route path='/listetiers' element={<><Menu></Menu><ListeTiers></ListeTiers></>}></Route>
            <Route path='/tiers/edit/:id' element={<><Menu></Menu><EditTiers></EditTiers></>}></Route>

            <Route path='/facture' element={<><Menu></Menu><Facturation></Facturation></>}></Route>
            <Route path='/facture/liste' element={<><Menu></Menu><ListeFacture></ListeFacture></>}></Route>
            <Route path='/facture/creer' element={<><Menu></Menu><CreerFacture></CreerFacture></>}></Route>
            <Route path='/facture/edit/:id' element={<><Menu></Menu><EditFacture></EditFacture></>}></Route>
          </Routes>
        </Router>
      </userContext.Provider>
    </div>
  );
}

export default App;
