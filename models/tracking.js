const mongoose = require('mongoose')

const trackingSchema = mongoose.Schema({
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    dateTrack:{

        type:String,
        default:new Date().toLocaleDateString()
    },
    foodID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'foods',
        required:true
    },
    quantity:{
        type:Number,
        required:true,
        min:1
    }
},{timestamps:true})

const trackingModel = mongoose.model('trackings',trackingSchema)

module.exports = trackingModel;