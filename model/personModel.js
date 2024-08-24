const mongoose = require("mongoose");

//DB SCHEMAS
const personSchema = new mongoose.Schema({
    name:{
      type:String,
      required:[true,'Must have a name']
      
    },
    age:{
      type:Number,
      default:18,
    },
    email:{
      type:String,
      unique:true,
      required:[true,'Must have email.']
    }
  })
  
  const Person = mongoose.model('Person', personSchema)
  module.exports = Person