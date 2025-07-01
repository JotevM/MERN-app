const mongoose=require('mongoose')

const reportSchema=new mongoose.Schema({
    date:{
        type:String,
        required:true
    },
    client:{
        type: mongoose.SchemaTypes.ObjectId,
        ref:Client       
    },
    description:{
        type:String,
        required:true
    }
})

module.exports=Report=mongoose.model("Report", reportSchema)