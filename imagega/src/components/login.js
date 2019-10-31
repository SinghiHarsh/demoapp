import React, { Component } from 'react';
import '../CSS/login.css';
import axios from 'axios'
import { Redirect } from 'react-router-dom';

export default class Login extends Component {

    state = {
        email: '',
        password: '',
        loginIn: false
    }

    handleSubmit = (e) =>{
        console.log(this.state);
        e.preventDefault();
        axios.post("http://localhost:8081/LoggedIn",this.state)
        .then((res)=>{
            console.log(res);
            alert(res.data.msg);
            if(res.data.msg == 'User Logged In'){
                console.log(this.props);
                this.props.sendData(res)
                localStorage.setItem('id', res.data.data._id)
                // this.props.history.push({
                //     pathname: "/home",
                //     // state:res.data.data
                // });
                this.setState({
                    loginIn: true,
                    data: res.data.data
                })
            }
            else
            {
                //  this.props.history.push('/');
                 this.setState({
                     loginIn:false
                 })
            }
        })
        .catch((err)=>{
            console.log(err.message);
        })
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.type]: e.target.value,
        })
    }


    render() {
        console.log("check",this.props)
        if(this.state.loginIn == true) {
            return <Redirect 
                to={{
                    pathname: "/home",
                    state: this.state.data
                }}
            />
        }
        return (
            <div id="log12">
                <div id="login" >
                        <form>
                            <h1>LOG IN</h1>
                            <input type="email" placeholder="Email-Id" required onChange={ this.handleChange } /><br />
                            <input type="password" placeholder="Password" required onChange={ this.handleChange } /><br />
                            <input type="checkbox" name="" id="" /><span>Remember Me </span><br />
                            <button id="lbut" onClick={ this.handleSubmit }>Login</button><br/>
                            <a href="/SignUp"><span id="Sulink">Don't have an account?Create one.</span></a>  
                        </form>  
                        
                    </div>
                </div>
        )
    }
}
