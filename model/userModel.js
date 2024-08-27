const mongoose = require("mongoose")
const validator = require("validator")


const User = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Enter your name'],
    },
    email:{
        type:String,
        required:[true, 'Enter your email'],
        validate:[validatore.isEmail, 'Please enter valid email'],
        lowercase:true,
        unique:true
    },
    photo:String,
    password:{
        type:String,
        required:true,
        minlength:2
    },
    confirmPassword:{
        type:String,
        required:true
    }
})

module.exports = User