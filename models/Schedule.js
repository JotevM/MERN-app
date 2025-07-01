const mongoose =require('mongoose')
const User = require('./User')
const Client = require('./Client')

const scheduleSchema=new mongoose.Schema({
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        ref: User,
        required:true
    },
    client:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:Client,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    }
})

module.exports=Schedule=mongoose.model("Schedule", scheduleSchema)