import React, { Component } from 'react';
import '../CSS/home.css';
import Navbar from './navbar';

export default class Fav extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <section className="grid-container1">
                    
                    {
                        this.props.fav.map(el => {
                            return (
                                
                                <div className="gc1">
                                    <img src="/Public/Images/img1.jpg" alt="img1" />
                                </div>

                            )
                        })
                    }
                    
                    {/* <div className="gc1"><img src="/Public/Images/img2.jpg" alt="img2" /></div>
                    <div className="gc1"><img src="/Public/Images/img6.jpg" alt="img6" /></div> */}
                    <div className="gca1">
                        <label className="custom-file-upload1">
                            <input type="file"/>
                            <span id="addi1">+</span>
                        </label>
                    </div>
                </section>
            </div>
        )
    }
}
