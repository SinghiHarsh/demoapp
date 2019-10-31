import React, { Component } from 'react';
import '../CSS/navbar.css';


export default class Navbar extends Component {
    
    header = () =>{
        var header=document.getElementById("header");
        var mToggle=document.getElementById("toggle");
        
        mToggle.addEventListener("click",function(){
            if(header.className === "open")
            {
                header.className = "";
            }
            else
            {
                header.className = "open";
            }
        })
    }

    render() {
        return (
            <div>
                <header id="header">
                <div className="header-container">
                    <div id="logo">
                        <a href="home.html"><img src="" alt="" />Galleria </a>
                    </div>
                    <div className="nav-tog" id="toggle" onClick = { this.header }>
                        <i className="fas fa-bars" id="navb1"></i>
                        <i className="fa fa-times" aria-hidden="true" id="navb"></i>
                    </div>
                    <div id="navigation">
                        <ul>
                            <li><a href="/home">Home</a></li>
                            <li><a href="/fav">Favourites</a></li>
                            <li><a href="/devicefolders">Device Folders</a></li>
                            <li><a href="/trash">Trash</a></li>
                            <li><a href="/">Logout</a></li>
                        </ul>
                    </div>
                </div>
            </header><br />
            </div>
        )
    }
}
