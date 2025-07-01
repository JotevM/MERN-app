const Message=require("../models/Message")
const { findUserById, findClientById }=require ('./utilities')
const asyncHandler = require('express-async-handler')

const createMessage=asyncHandler(async(req, res)=>{
    const{user, client, message, sender, read} = req.body
    console.log(user, client, message, sender, read)
   if(!message){
        return res.status(400).json({message:'Please write a message'})
    }

    const newMessage = await Message.create({user, client, message, sender, date:new Date().toISOString(), read})

    return { ...newMessage._doc, user: await findUserById(newMessage.user), client: await findClientById(newMessage.client) }
})

const messages=asyncHandler(async(req, res)=>{
    const userId = req.body.userId
    const clientId = req.body.clientId
    console.log(userId, clientId)

    const mess = await Message.find({user: userId, client: clientId})
    console.log(mess)
    
    const m = await Promise.all(
        mess.map(async(message) =>{
            const user = await findUserById(message.user)
            console.log(user)
            const client = await findClientById(message.client)
            console.log(client)
            return {...message._doc, user, client}
        })
    )

    res.json(m)
})

const findUnreadMessagesByUser = asyncHandler(async(req, res)=>{
    const id = req.query.id
    console.log(id)
    const m = await Message.find({user:id, read:false})

    res.json(m.length)
})

const findUnreadMessagesByUserAndClient = asyncHandler(async(req, res)=>{
    const user = req.query.user
    const client = req.query.client
    const m = await Message.find({user, client, read:false})

    res.json(m.length)
})

const updateMessages = asyncHandler(async(req, res)=>{
    const {user, client} = req.body
    const mess = await Message.find({user, client, read:false})

    const updatedMessages = []
   
    for(const m of mess){
        const updatedMessage = await Message.findByIdAndUpdate({_id: m._id}, {read:true}, {new:true})
        updatedMessages.push(updatedMessage._doc);
    }

    res.json(updatedMessages)
})

const deleteMessage = asyncHandler(async(req, res)=>{
    const {id} = req.body
    
    const m = await Message.findByIdAndDelete(id)

    //return {...m._doc, user:findUserById(m.user),client:findClientById(m.client)}
    res.json(m)
})

module.exports={
    createMessage,
    messages,
    deleteMessage,
    findUnreadMessagesByUser,
    findUnreadMessagesByUserAndClient,
    updateMessages
}