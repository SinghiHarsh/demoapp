const mongoose = require('mongoose');

const RegisterSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    images:[{
        type:String,
    }],
    trashImgs:[String]
})

const Register = new mongoose.model('Register',RegisterSchema );

module.exports = Register;

