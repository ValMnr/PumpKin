import React from 'react';
import './App.css';
//import Login from './Account/Login.js';
//import Signup from './Account/Signup.js'
import Card from './Card/Card.js'
import Wallet from './Wallet/Wallet.js'





function App() {

  sessionStorage.setItem('crt_user_id',0)
  
  return (
    <div className="">
      <header className="">
       
      </header>

      <Wallet  />
    </div>
  );
}

export default App;
