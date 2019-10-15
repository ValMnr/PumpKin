import React, { Component } from 'react';
import Data from '../Data/Data.js'
import { Button } from '../../node_modules/reactstrap'
import Navbar from '../Navbar/Navbar.js'
import { BrowserRouter, Route, Link, withRouter, Redirect } from 'react-router-dom';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            redirect:false
        }
        this.connect = this.connect.bind(this);
        this.handleChange = this.handleChange.bind(this)
        this.fastLogin = this.fastLogin.bind(this)
        this.fastLogout = this.fastLogout.bind(this)
    }


    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }
    componentDidMount(){
        console.log('com did mount : ',localStorage.getItem("logged") )
        
        //window.location = "localhost:3000/"

        
    }

    componentDidUpdate(){
        console.log("comp update / redirecting:",this.state.redirect)

  

        console.log("redirected")

    }

    async  fastLogin () {
        console.log("Before login test, current logged state : ", localStorage.getItem('logged'))


        let url = "localhost:3000/"

        localStorage.setItem('logged', true)

        window.location.reload(true);

        console.log("After login test, current logged state : ", localStorage.getItem('logged'))
        this.setState({redirect:true})
       
    }
 
    fastLogout() {
        localStorage.clear()
        console.log("After logout current logged state : ", localStorage.getItem('logged'))
        if(localStorage.getItem('logged')===false){
            console.log("loffed out")
        }

        window.location.reload(true)
      
        //window.location.replace= "localhost:3000/"
            //window.location = "localhost:3000/"
        //window.location.reload()
        //window.location.replace("localhost:3000/")
       // setTimeout( window.location.reload()  , 3000); 
    
    }

    connect() {
        for (let i = 0; i < Data.Accounts.length; i++) {
            if (Data.Accounts[i].email === this.state.email) {
                if (Data.Accounts[i].password === this.state.password) {
                    this.props.crt_user = Data.Accounts[i].id;
                    sessionStorage.setItem('crt_user_id', Data.Accounts[i].id);
                    console.log('Signup succesful');
                    break;
                }
            }
        }
    }


    render() {
        if (localStorage.getItem('logged')) {
            return (
                <Redirect to={'/'} />
            )
        }
        else{

        return (
            <div className="col">
                <div className="row">
                    <input type="text" value={this.state.email} onChange={this.handleChange} name="email" placeholder="Email"></input>
                </div>
                <div className="row">
                    <input type="text" value={this.state.password} onChange={this.handleChange} name="password" placeholder="Password"></input>
                </div>
                <div className="row">
                    <button name="Log-in" onClick={this.connect} ></button>
                </div>

                <Link to="/" ><Button color="danger" title="Login test" onClick={this.fastLogin} >Login Test</Button></Link>

                <Link to="/"><Button color="danger" title="Login test" onClick={this.fastLogout} >Logout</Button></Link>

            </div>

        )
    }

    }

}

export default Login
