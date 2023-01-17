import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import UsersCreate from './Composants/UsersCreate/UsersCreate';
import Users from './Composants/Users/Users';
import Login from './Composants/Login/Login';
import Admin from './Composants/Admin/Admin';
import { userContext } from './Composants/Contexte/Contexte';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [userData, setUserData] = useState<any>("")

  useEffect( ( ) => {
    axios.get('/api/user/info').then(reponse => {
       setUserData(reponse.data)
      //  console.log(userData)
    })
  }, [])

  return (
    <div className="App">
      <userContext.Provider value={userData}>
        <BrowserRouter>
        <Router>
          <Routes>
            <Route path='/' element={<Login></Login>}></Route>
            <Route path='/users/create' element={<UsersCreate></UsersCreate>}></Route>
            <Route path='/users' element={<Users></Users>}></Route>
            <Route path='/admin' element={<Admin></Admin>}></Route>
          </Routes>
        </Router>
        </BrowserRouter>
      </userContext.Provider>
    </div>
  );
}

export default App;
