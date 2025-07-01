const mongoose = require('mongoose')
const User = require("./User")
const Client = require("./Client")

const messageSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: User
    },
    client: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: Client
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true,
    },
    sender: {
        type: String,
        required: true
    },
    read: {
        type: Boolean,
        required: true
    }
})

module.exports = Message = mongoose.model("Message", messageSchema)