const mongoose =require("mongoose")
const User = require('./User')
const Client = require('./Client')

const requestSchema=new mongoose.Schema({
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:User,
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
    ,
    requestDate:{
        type:String,
        default:new Date().toISOString().slice(0,10)
    }
})

module.exports=Request=mongoose.model("Request", requestSchema)