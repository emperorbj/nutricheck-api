const mongoose = require('mongoose');

const userSchema = ({
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
    age:{
        type:Number,
        required:true,
        min:10
    }
})

const userModel = mongoose.model('users',userSchema)

module.exports = userModel;