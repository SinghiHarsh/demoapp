import React, { Component } from 'react';
import '../CSS/Signup.css';

export default class SignUp extends Component {
    render() {
        return (
            <div id="SU12">
                <div id="SignUp">
                    <form>
                        <h1>SIGN UP</h1>
                        <input type="text" placeholder="Name" required/><br/>
                        <input type="email" placeholder="Email-Id" required /><br />
                        <input type="password" placeholder="Password" required /><br /><br/>
                        <a href="/home"><button id="lbut">Sign Up</button></a><br/>
                    </form> 
                </div>
            </div>
        )
    }
}
