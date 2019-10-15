import React, { Component } from 'react';
import Data from '../Data/Data.js'
import {Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem  } from '../../node_modules/reactstrap'
import {BrowserRouter, Route, Link } from 'react-router-dom';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isOpen:false,
            logged:localStorage.getItem('logged'),

        }  

        this.fastLogout = this.fastLogout.bind(this);
       
      
    
    }

    
    fastLogout() {
      localStorage.clear()
      console.log("After logout current logged state : ", localStorage.getItem('logged'))
      if(localStorage.getItem('logged')===false){
          console.log("loffed out")
      }

    
      //window.location.replace= "localhost:3000/"
          //window.location = "localhost:3000/"
      //window.location.reload()
      //window.location.replace("localhost:3000/")
     // setTimeout( window.location.reload()  , 3000); 
  
  }

    componentDidMount(){
      this.setState({logged:localStorage.getItem('logged')})
      console.log("mounted - state =",this.state.logged)

      if(sessionStorage.getItem("logged")){
        window.location = "localhost:3000/"
      }

    }  
    
    toggle = () => {
        this.setState({isOpen:!this.state.isOpen})
    };

    displayLogged(){

      console.log("display  logged - uid/logged:",sessionStorage.getItem('crt_user_id'),sessionStorage.getItem('logged'))
      return(
        <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Pumpkin</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/wallet/">Porte-feuille</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/transfert/">Transfert</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/account/">Mon Compte</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/" onClick={()=> this.fastLogout() }>Deconnexion</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>

    )
    }
    displayNotLogged(){
      console.log("display not logged - uid/logged:",sessionStorage.getItem('crt_user_id'),sessionStorage.getItem('logged'))

      return(
        <div>
             <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Pumpkin</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
       
              <NavItem>
                <NavLink href="/login/"  >Se connecter</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/signup/">Créer un compte</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        </div>

        )
      
    }

    display(){
        console.log("test",this.props.crt_user)
        if(this.props.crt_user!==undefined){
            return(
                <div>
                <Navbar color="light" light expand="md">
                  <NavbarBrand href="/">Pumpkin</NavbarBrand>
                  <NavbarToggler onClick={this.toggle} />
                  <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                      <NavItem>
                        <NavLink href="/wallet/">Porte-feuille</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href="/transfert/">Transfert</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href="/account/">Mon Compte</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href="/">Deconnexion</NavLink>
                      </NavItem>
                    </Nav>
                  </Collapse>
                </Navbar>
              </div>

            )
        }else{
            return(
                <div>
                     <Navbar color="light" light expand="md">
                  <NavbarBrand href="/">Pumpkin</NavbarBrand>
                  <NavbarToggler onClick={this.toggle} />
                  <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
               
                      <NavItem>
                        <NavLink href="/login/"  >Se connecter</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href="/signup/">Créer un compte</NavLink>
                      </NavItem>
                    </Nav>
                  </Collapse>
                </Navbar>
                </div>

                )

        }
        
    }

    render(){
        return(

            <div>{this.state.logged ? this.displayLogged() : this.displayNotLogged()}
            </div>


        )
    }
            
     
}

export default NavBar