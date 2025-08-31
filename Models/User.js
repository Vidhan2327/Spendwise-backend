const mongoose = require('mongoose');
const UserSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
         minlength: 5,
    }, email:{
        type:String,
        required:[true,'Please provide an email'],
        unique:true,
         match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email', // regex for email validation
      // regex means pattern matching
    ],
    }, password:{
        type:String,
        required:[true,'Please add a password'],
    }
})
const User=mongoose.model('User',UserSchema);
module.exports=User;