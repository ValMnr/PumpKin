import React from 'react';
import './App.css';
import { Button } from '../node_modules/reactstrap'

import { BrowserRouter, Route, Link } from 'react-router-dom';

//import Login from './Account/Login.js';
//import Signup from './Account/Signup.js'
import Card from './Card/Card.js'
import Wallet from './Wallet/Wallet.js'
import Transfert from './Transfert/Transfert';
import Navbar from './Navbar/Navbar.js'
import Login from './Account/Login';
import Signup from './Account/Signup';




function App() {
 

  sessionStorage.setItem('crt_user_id', null)
  console.log("crt user",sessionStorage.getItem('crt_user_id'))

 

  return (
    <div className="">
      <BrowserRouter>
        <header className="">


        </header>
        <Navbar />

        <Button color="primary" title="Transfer" onClick={sessionStorage.setItem('crt_user_id','1')} >Login Test</Button>

        <Route exact path="/" component={() => <Link to="/transfert"><Button color="primary" title="Transfer" name="transfert" >Transfert</Button></Link>} />
        <Route exact path="/" component={() => <Link to="/wallet"><Button color="primary" title="Transfer" name="wallet" >Wallet</Button></Link>} />
        
        
        <Route path="/transfert" component={() => <Transfert />} />
        <Route path="/wallet" component={() => <Wallet />} />
        <Route path="/account" component={() => <Button />} />

        <Route path="/login" component={() => <Login />} />
        <Route path="/signup" component={() => <Signup />} />



      </BrowserRouter>
    </div>
  );
}

export default App;

