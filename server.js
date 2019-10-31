const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require("path");

const Reg = require('./models/RegisterScheam'); 

const app = express();

app.use(cors());

app.use(bodyParser.json())

app.get('/',(req,res) => {
    res.send("Hello");
})

mongoose.connect('mongodb://127.0.0.1:27017/imageGallery',(err)=>{
    if(err)
    {
        console.log(err);
    }
    else
    {
        console.log("DB connect hogaya tatti chakke!");
    }
});

app.post('/RegisterAdded',(req,res)=>{
    let {name, email, password} = req.body;
    Reg.findOne({email})
    .exec((err,data) => {
        if(err)
            return res.json({msg:err.message})
        if(data)
            return res.json({msg:'Email already exists'})
        let regData = new Reg({name, email, password})
        regData.save((err,data1)=> {
            if(err)
                return res.json({msg:err.message})
            if(data1)
                return res.json(data1)
        })

    }) 
})

// app.get("/loggedin", (req,res)=>{
//     res.send("Yes, in")
//     console.log("The server has logged in")
//     console.log("#################")
// })

app.post('/LoggedIn',(req,res)=>{
    let { name, email, password } = req.body;
    Reg.findOne({email})
    .exec((err,data)=>{
        if(err)
            return res.json({msg:err.message})
        if(data)
        {
            if(data.password == password)
                return res.json({msg:'User Logged In',data})
            else   
                return res.json({msg:'Invalid password'})
        }
        else    
            return res.json({msg:'Email does not exist'})
    })
})

app.post('/AddImages',(req,res)=>{
    let {userId, images} = req.body;
    Reg.findOne({_id:userId})
    .exec((err,data)=>{
        if(err)
            return res.json({msg:err.message})
        if(data)
        {
            images.forEach(id=>{
                data.images.push(id)
            })
            data.save((err,finalData)=>{
                if(err)
                    return res.json({msg: err.message})
                return res.json({msg: "Image added successfully", finalData});
            });
        }
    })
})

app.post("/addtrash",(req,res)=>{
    let{userId, trash} = req.body;
    Reg.findOne({_id:userId})
    .exec((err,data)=>{
        if(err)
            return res.json({msg:err.message})
        if(data){
            data.trashImgs.push(trash)
            data.images = data.images.filter(el=>{
                return el!==trash
            })
            data.save((err,data1)=>{
                if(err)
                    return res.json({msg: err.message})
                return res.json({msg: "Image added to trash"})
            })
        }
    })
})

app.post("/getImages",(req,res)=>{
    let {userId} = req.body;
    Reg.findOne({_id: userId })
    .exec((err,data)=>{
        if(err)
            return res.json({msg: err.message})
        if(data)
            return res.json(data)
    })
})

app.post("/getAllTrash",(req,res)=>{
    let {userId} = req.body;
    Reg.findOne({_id: userId })
    .exec((err,data)=>{
        if(err)
            return res.json({msg: err.message})
        if(data)
            return res.json(data)
    })
})



//Change1
app.listen(8081 , () => {
    console.log("connect hogaya ghante");
})