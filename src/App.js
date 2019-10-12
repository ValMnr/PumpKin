import React from 'react';
import './App.css';
import { Button } from '../node_modules/reactstrap'

import {BrowserRouter, Route, Link } from 'react-router-dom';

//import Login from './Account/Login.js';
//import Signup from './Account/Signup.js'
import Card from './Card/Card.js'
import Wallet from './Wallet/Wallet.js'
import Transfert from './Transfert/Transfert';





function App() {

  sessionStorage.setItem('crt_user_id',0)
  
  return (
    <div className="">
      <BrowserRouter>
      <header className="">
       
      </header>

      <Route exact path="/" component={() =>  <Wallet  />}/>
  <Route exact path="/" component={() => <Link to="/transfert"><Button color="primary" title="Transfer" name="transfert" >Transfert</Button></Link> }/>
      <Route path="/transfert" component={() => <Transfert/>}/>
    </BrowserRouter>
    </div>
  );
}

export default App;

