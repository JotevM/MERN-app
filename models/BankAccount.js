const mongoose=require("mongoose")

const bankAccountModel= new mongoose.Schema({
    accountNumber:{
        type:String,
        required:true
    },
    accountType:{
        type:String,
        required:true
    },
    /*moneyBalance:{
        type:String,
        required:true
    },*/
    client:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Client'
    }
})

module.exports=BankAccount=mongoose.model("BankAccount", bankAccountModel)