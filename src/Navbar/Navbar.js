import React, { Component } from 'react';
import {Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink  } from '../../node_modules/reactstrap'

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
  }

    componentDidMount(){
      this.setState({logged:localStorage.getItem('logged')})
      console.log("mounted - state =",this.state.logged)

    }  
    
    toggle = () => {
        this.setState({isOpen:!this.state.isOpen})
    };

    displayLogged(){

      console.log("display  logged - uid/logged:",localStorage.getItem('crt_user_id'),localStorage.getItem('logged'))
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
                <NavLink href="/payin/">Pay In</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/payout/">Pay Out</NavLink>
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
      console.log("display not logged - uid/logged:",localStorage.getItem('crt_user_id'),localStorage.getItem('logged'))

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

    render(){
        return(
            <div>{this.state.logged ? this.displayLogged() : this.displayNotLogged()}
            </div>
        )
    }
            
     
}

export default NavBar