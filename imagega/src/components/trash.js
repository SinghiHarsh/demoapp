import React, { Component } from 'react';
import '../CSS/trash.css';
import Navbar from './navbar';
import Axios from 'axios';

export default class Trash extends Component {
    state = {
        trash:[]
    }
    getTrash = () => {
        Axios.post("http://localhost:8081/getAllTrash",{userId: localStorage.getItem('id')})
        .then(res=>{
            console.log("check res",res)
            this.setState({
                trash: res.data.trashImgs
            })
        })
        .catch(err=>{
            console.log(err.message)
        })
    }
    componentDidMount(){
        this.getTrash()
    }
    render() {
        console.log(this.props)
        return (
            <div>
                <Navbar />
                <section className="grid-container">
                    {
                        this.state.trash.length > 0 ? this.state.trash.map(el => {
                            return ( 
                                <div className="gc">
                                    <img src={ el } alt="img1" />
                                </div>
                            )
                        })
                        : (
                            <div>
                                <p>No Trash Images</p>
                            </div>
                        )
                    }
                    {/* <div className="gc"><img src="/Public/Images/img1.jpg" alt="img1" /></div> */}
                    {/* <div className="gc"><img src="/Public/Images/img2.jpg" alt="img2" /></div>
                    <div className="gc"><img src="/Public/Images/img3.jpg" alt="img3" /></div> */}
                </section>
            </div>
        )
    }
}
