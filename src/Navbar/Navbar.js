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
            userLogged:sessionStorage.getItem('crt_user_id')
        }  
       
      
    
    }
  
    toggle = () => {
        this.setState({isOpen:!this.state.isOpen})
    };

    display(){
        console.log(this.props.crt_user)
        if(this.props.crt_user==undefined){
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
                        <NavLink href="/" onClick={sessionStorage.setItem('crt_user_id',undefined)}>Deconnexion</NavLink>
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
                        <NavLink href="/login/">Se connecter</NavLink>
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

            <div>{this.display()}</div>


        )
    }
            
     
}

export default NavBar