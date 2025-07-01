const BankAccount = require('../models/BankAccount')
const Client = require('../models/Client')
const asyncHandler = require('express-async-handler')

const addBankAccountToClient = asyncHandler(async (req, res) => {
    const {clientId, accountNumber, accountType} = req.body

    const client = await Client.findById(clientId)
    if (!client) {
      return res.status(400).json({message:'Client can not be found'})
    }
  
    const newBankAccount = await BankAccount.create({ accountNumber, accountType })
  
    client.bankAccounts.push(newBankAccount._id)
    await client.save()
  
    //return newBankAccount

    res.json(newBankAccount)
})

module.exports={
    addBankAccountToClient
}
