import React, { Component } from 'react';
import '../CSS/home.css';
import Navbar from './navbar';
import Axios from 'axios';

import firebase from "firebase";
import FileUploader from 'react-firebase-file-uploader';

const firebaseConfig = {
    apiKey: "AIzaSyBPKCPmK82u5GqeJfgqNa2vgtJm9dYOB-M",
    authDomain: "imageuploader-5d784.firebaseapp.com",
    databaseURL: "https://imageuploader-5d784.firebaseio.com",
    projectId: "imageuploader-5d784",
    storageBucket: "imageuploader-5d784.appspot.com",
    messagingSenderId: "6364979224",
    appId: "1:6364979224:web:d2e5703645efd6dac5a36d",
    measurementId: "G-SC3MFTE0ED"
};

firebase.initializeApp(firebaseConfig)

export default class Home extends Component {
    
    state = {
        filenames: [],
        downloadURLs: [],
        isUploading: false,
        uploadProgress: 0,
        trash:[]
    };

    handleTrash = (e) => {
        console.log(e.target.id)
        const body = {
            userId: localStorage.getItem('id'),
            trash: e.target.id
        }
        Axios.post("http://localhost:8081/addtrash", body)
        .then(res=>{
            console.log(res);
            this.makeApiCall();
        })
        .catch(err=>{
            console.log(err.message);
        })
        // this.setState({
        //     trash: [...this.state.trash, e.target.id],
        //     images: images
        // })
        // this.props.addImage(this.state.images)
        // this.props.addTrash(this.state.trash)
    }

    handleFav = (e) => {
        let favs = this.state.fav.filter(el => {
            return e.target.id !== el
        })
        this.setState({
            fav : favs
        })
        this.props.addFav(this.state.fav)
    }
    handleUploadStart = () =>
    this.setState({
        isUploading: true,
        uploadProgress: 0
    });
     
    handleProgress = progress =>
    this.setState({
        uploadProgress: progress
    });
     
    handleUploadError = error => {
    this.setState({
        isUploading: false
        // Todo: handle error
    });
    console.error(error);
    };
     
    handleUploadSuccess = async filename => {
    const downloadURL = await firebase
        .storage()
        .ref("images")
        .child(filename)
        .getDownloadURL();

    this.setState({
        filenames: [...this.state.filenames, filename],
        downloadURLs:[...this.state.downloadURLs,downloadURL],
        uploadProgress: 100,
        isUploading: false
    })

    const body = {
        userId: localStorage.getItem('id'),
        images: this.state.downloadURLs
    }
    Axios.post("http://localhost:8081/AddImages",body)
    .then(res=>{
        console.log(res)
        this.makeApiCall();
        this.setState({
            filenames: [],
            downloadURLs: []
        })
    })
    .catch(err=>{
        console.log(err.message)
    })
    }
    makeApiCall = () =>{
        const body = {
            userId: localStorage.getItem('id')
        }
        Axios.post("http://localhost:8081/getImages", body)
        .then(res=>{
            console.log(res)
            this.setState({
                images: res.data.images
            })
        })
        .catch(err=>{
            console.log(err.message)
        })
    }
    componentDidMount(){
        this.makeApiCall();
    }

    render() {
        return (
            <div>
                 <Navbar />
                 <section className="grid-container1">
                     <div className="gca1">
                        { 
                            this.state.images && this.state.images.length > 0  ? this.state.images.map(el => {
                            return (
                                <div className="gc1">
                                    <img src={ el } alt=""/>
                                    <div>
                                        <i className="fas fa-trash bin" id= { el } onClick = { this.handleTrash } ></i>
                                        <i className="far fa-star star" id= { el } onClick = { this.handleFav }></i>
                                    </div>
                                </div>
                            )
                            }) 
                            : (
                                <div>
                                    <p>No Images</p>
                                </div>
                            )
                        }
                        <div className='row'>
                            <FileUploader
                                accept="image/*"
                                name="image-uploader-multiple"
                                randomizeFilename
                                storageRef={firebase.storage().ref("images")}
                                onUploadStart={this.handleUploadStart}
                                onUploadError={this.handleUploadError}
                                onUploadSuccess={this.handleUploadSuccess}
                                onProgress={this.handleProgress}
                                multiple
                            />
                        </div>
                     </div>
                    <form>
                    </form>
                </section>
            </div>
        )
    }
}

/*
<form onSubmit={this.onFormSubmit}>
                            <label className="custom-file-upload1">
                                <input type="file" multiple onChange = { this.handleChange }  />
                                {/* <span id="addi1">+</span> 
                                <button type="submit">+</button>
                            </label>
                        </form>*/
                        