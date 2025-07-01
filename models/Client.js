const mongoose=require("mongoose")

const clientSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    UPIN:{ //JMBG
        type:String,
        required:true,
        minlength: 13,
        maxlength: 13,
    },
    IDCard:{ //LK
        type:String,
        required:true,
        minlength: 9,
        maxlength: 9,
        unique: true
    },
    bankAccounts: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'BankAccount'
    }],
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role: {
        type:String,
        required:true
    }
})

module.exports=Client=mongoose.model("Client",clientSchema)