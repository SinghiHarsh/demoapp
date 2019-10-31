import React,{Component} from 'react';
import '../CSS/dfolds.css';
import Navbar from './navbar';

class Dfolds extends Component{
  render(){
    return(
      <div>
            <Navbar />
            <section id="df22">
                <div id="dfd22">
                    <center><p>Come let's make some memories together!</p></center>
                    <center><i className="fas fa-smile-wink" style={{fontSize: 80}}></i></center>
                </div>
            </section>
            <section id="addf2">
                <label className="custom-file-upload2">
                    <input type="file"/>
                    <span id="cfub2">+</span>
                </label>
            </section>
      </div>
    )
  }
}

export default Dfolds;