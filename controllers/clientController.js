const Client = require('../models/Client')
const asyncHandler = require('express-async-handler') //menja try catch blokove za cuvanje, brisanje i menjanje podataka iz baze
const jwt = require("jsonwebtoken")
const config = require("config")
const bcrypt = require('bcrypt') //hashuje lozinku pre snimanja iste
const { createConnection } = require('mongoose')
const BankAccount = require('../models/BankAccount')




const createNewClient = asyncHandler(async (req, res) => {
    console.log("controller");
    const { name, city, address, phone, upin, idCard, bankAccounts, email, password } = req.body;
    console.log(req.body);

    if (!name || !city || !address || !phone || !upin || !idCard || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (upin.length !== 13 || !/^\d+$/.test(upin)) {
        return res.status(400).json({ message: 'UPIN must be a 13-digit number' });
    }

    if (idCard.length !== 9 || !/^\d+$/.test(idCard)) {
        return res.status(400).json({ message: 'ID card must be a 9-digit number' });
    }

    if (!/^\d+$/.test(phone)) {
        return res.status(400).json({ message: 'Phone must be numbers' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    const duplicate = await Client.findOne({ UPIN: upin, IDCard: idCard, email: email }).lean().exec();

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate UPIN, ID card number or email' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const clientObject = { name, city, address, phone, UPIN: upin, IDCard: idCard, email, password: hashedPassword, role: 'client' };

    const client = await Client.create(clientObject);

    const newBankAccounts = [];
    for (let i = 0; i < bankAccounts.length; i++) {
        const { accountNumber, accountType } = bankAccounts[i];

        if (!/^\d+$/.test(accountNumber)) {
            return res.status(400).json({ message: 'Account number must be a number' });
        }

        const newBankAccount = await BankAccount.create({ accountNumber, accountType, client: client._id });
        await newBankAccount.save();
        newBankAccounts.push(newBankAccount._id);
    }

    client.bankAccounts = newBankAccounts;
    await client.save();

    if (client) {
        res.status(201).json({ message: `New client ${email} created` });
    } else {
        res.status(400).json({ message: 'Invalid client data received' });
    }
});




const loginClient = asyncHandler(async (req, res) => {

    console.log('loginClient')
    const { email, password } = req.body
    console.log(email, password)
    if (!email || !password) {
        return res.status(400).json({ message: 'Client not found!' })
    }

    const clientFound = await Client.findOne({ email }).lean().exec()

    if (!clientFound) {
        return res.status(409).json({ message: 'Client not found!' })
    }

    const isMatch = await bcrypt.compare(password, clientFound.password)

    if (!isMatch) {
        return res.status(400).json({ message: 'Password inncorect' })
    }
    const clientObject = jwt.sign({ role: clientFound.role }, config.get("secretKey"), { expiresIn: 60 * 60 })

    const client = ({ id: clientFound._id, clientObject, name: clientFound.name, tokenExpiration: 60 * 60 + Math.floor(new Date().getTime() / 1000), role: clientFound.role })

    if (client) {
        res.status(201).json({
            loginClient: {
                id: client.id,
                token: client.clientObject,
                name: client.name,
                tokenExpiration: client.tokenExpiration,
                role: client.role
            },
            message: `${email} your login is successful!`
        })
    } else {
        res.status(400).json({ message: 'Invalid client data received' })
    }
})

const clients = asyncHandler(async (req, res) => {
    const cli = await Client.find().select('-password').lean()
    console.log(cli)

    if (!cli?.length) {
        return res.status(400).json({ message: 'No client found' })
    }
    res.json(cli)
})

const findClient = asyncHandler(async (req, res) => {

    const { id } = req.query

    const cli = await Client.findOne({ _id: id })

    const acc = await BankAccount.find({ client: id }).lean()

    if (!acc?.length) {
        return res.status(400).json({ message: 'No bank account found' })
    }

    const c = { ...cli._doc, account: acc._doc }

    res.json(c)
})

const findClients = asyncHandler(async (req, res) => {
    if (!req.isAuth || req.role !== 'user') {
        return res.status(400).json({ message: 'You can not get clients!!!!!!!!!!!!!!!!!' })
    }
    const name = req.query.name
    console.log(name)

    const cli = await Client.find({ name: { $regex: new RegExp(name), $options: 'i' } }).select('-password');

    if (!cli.length) {
        return res.status(400).json({ message: 'No clients found' });
    }

    const clientsWithAccounts = [];

    for (const client of cli) {
        const bankAccounts = await BankAccount.find({ client: client._id }).lean();
        const clientWithAccounts = { ...client._doc, bankAccounts: bankAccounts };
        clientsWithAccounts.push(clientWithAccounts);
    }

    res.json(clientsWithAccounts);
})

const findBankAccounts = asyncHandler(async (req, res) => {

    const { id } = req.query;

    const bankAccounts = await BankAccount.find({ client: id }).lean()

    if (!bankAccounts.length) {
        return res.status(400).json({ message: 'No bank accounts found' })
    }
    res.json(bankAccounts)
})

const changeClientPassword = asyncHandler(async (req, res) => {
    const { id, password, newPassword, confirmation } = req.body

    if (!password || !newPassword || !confirmation) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const cli = await Client.findOne({ _id: id }).exec()

    if (!cli) {
        return res.status(400).json({ message: 'Client not found' })
    }

    const c = await bcrypt.compare(password, cli.password)

    if (!c) {
        return res.status(200).json({ message: 'Password is incorrect' })
    }

    const c2 = await bcrypt.compare(password, newPassword)

    if (c2) {
        return res.status(400).json({ message: 'New password cannot be the the same!' })
    }

    if (newPassword != confirmation) {
        return res.status(400).json({ message: 'New password and confirmation does not match!' })
    }

    if (newPassword) {
        cli.password = await bcrypt.hash(newPassword, 10)
    }

    //const updatedClient = await Client.findByIdAndUpdate({_id:id},{ password:hash}, {new:true})
    const updatedClient = await cli.save()

    res.json({ message: `${updatedClient.email} password has been changed successfully!` })

})

const updateClient = asyncHandler(async (req, res) => {
    const { id,
        newname,
        newcity,
        newaddress,
        newphone,
        newidCard,
        newemail, } = req.body

    try {
        const cli = await Client.findOne({ _id: id }).exec()

        if (!cli) {
            return res.status(400).json({ message: 'Client not found' })
        }

        const duplicate = await Client.findOne({ email: newemail }).lean().exec()

        if (duplicate && duplicate?._id.toString() !== id) {
            return res.status(409).json({ message: 'Duplicate email' })
        }

        if (newname) {
            cli.name = newname;
        }
        if (newcity) {
            cli.city = newcity;
        }
        if (newaddress) {
            cli.address = newaddress;
        }
        if (newphone) {
            cli.phone = newphone;
        }
        if (newidCard) {
            cli.idCard = newidCard;
        }
        if (newemail) {
            cli.email = newemail;
        }

        const updatedClient = await cli.save()

        res.json({ message: `${updatedClient.email} updated` });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update client' });
    }
})

const deleteClient = asyncHandler(async (req, res, args) => {
    if (!req.isAuth || req.role !== "user") {
        return res.status(400).json({ message: 'You can not delete client! Please login again' })
    }

    const { id } = req.body

    if (!id) {
        return res.status(400).json({ message: 'Client ID Required' })
    }

    const cli = await Client.findById(id).exec()

    if (!cli) {
        return res.status(400).json({ message: 'Client not found' })
    }

    await BankAccount.deleteMany({ client: id }).exec();

    const result = await cli.deleteOne()

    const reply = `Client ${result.email} with ID ${result._id} and associated bank accounts deleted`

    res.json(reply)
})

module.exports = {
    createNewClient,
    clients,
    findClient,
    findClients,
    deleteClient,
    loginClient,
    changeClientPassword,
    updateClient,
    findBankAccounts
}