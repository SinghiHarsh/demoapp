import React,{Component} from 'react';
import Dfolds from './components/dfolds';
import Fav from './components/fav';
import Home from './components/home';
import Login from './components/login';
import Trash from './components/trash'
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import img1 from './Images/img1.jpg'
import img2 from './Images/img2.jpg'
import img3 from './Images/img3.jpg'
import img4 from './Images/img4.jpg'
import img5 from './Images/img5.jpg'
import img6 from './Images/img6.jpg'
import SignUp from './components/SignUp';

class App extends Component{
  state = {
    images : [],
    trash: [],
    fav : [],
    id: ""
  }

  addImage = (e) => {
    this.setState({
      images : e
    })
  }

  addTrash = (e) => {
    this.setState({
      trash : e
    })
  }

  addFav = (e) => {
    this.setState({
      fav : e
    })
  }
  sendData = (res) => {
    this.setState({
      id: res.data.data._id
    })
  }
  render(){
    return(
      <Router>
      <div>
        <Route exact path="/" render={(props) => <Login {...props} sendData={this.sendData} /> }  />
        <Route exact path="/SignUp" component={SignUp} />
        <Route exact path="/home" render={ (props) => <Home {...props} images = { this.state.images } fav = { this.state.fav } addImage = { this.addImage } addTrash = { this.addTrash } addFav = { this.addFav }  sendData={this.state.id} /> } />
        <Route exact path="/fav" render = { (props) => <Fav {...props} fav = {this.state.fav} /> }  />
        <Route exact path="/trash" render = { (props) => <Trash {...props} trash = {this.state.trash} sendData={this.state.id} /> } />
        <Route exact path="/devicefolders" component={Dfolds} />
      </div>
      </Router>
    )
  }
}

export default App;
