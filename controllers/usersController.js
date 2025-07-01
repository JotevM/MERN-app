const User = require('../models/User')
const asyncHandler = require('express-async-handler') //menja try catch blokove za cuvanje, brisanje i menjanje podataka iz baze
const jwt = require("jsonwebtoken")
const config = require("config")
const bcrypt = require('bcrypt') //hashuje lozinku pre snimanja iste

const getAllUsers = asyncHandler(async (req, res) => {
    if (!req.isAuth || req.role !== "admin") {
        return new Error('You can not get users! Please login again!')
    }

    const users = await User.find().select('-password').lean() //vratice nam podatke bez lozinke, i samo najopstije cemu sluzi lean
    if (!users?.length) {
        return res.status(400).json({ message: 'No users found' })
    }
    res.json(users)
})

const ordinaryUsers = asyncHandler(async (req, res) => {
    if (!req.isAuth) {
        return new Error('You can not get users! Please login again!')
    }

    const users = await User.find({ role: "user" }).select('-password').lean() //vratice nam podatke bez lozinke, i samo najopstije cemu sluzi lean
    if (!users?.length) {
        return res.status(400).json({ message: 'No users found' })
    }
    res.json(users)
})

const findUser = asyncHandler(async (req, res) => {
    if (!req.isAuth || req.role !== "admin") {
        return new Error('You can not get users! Please login again!')
    }
    const { id } = req.params
    console.log(id)
    const users = await User.findOne({ _id: id }).select('-password').lean() //vratice nam podatke bez lozinke, i samo najopstije cemu sluzi lean
    if (users?.length) {
        return res.status(400).json({ message: 'No users found' })
    }
    res.json(users)
})

const createNewUser = asyncHandler(async (req, res) => {

    if (!req.isAuth || req.role !== "admin") {
        return new Error('You can not add user! Please login again!')
    }

    const { name, username, password, role } = req.body

    if (!name || !username || !password /*|| !Array.isArray(role) || !role.length*/ || !role) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const duplicate = await User.findOne({ username }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const userObject = { name, username, "password": hashedPassword, role }

    const user = await User.create(userObject)

    if (user) {
        res.status(201).json({ message: `New user ${username} created` })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }
})

const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(400).json({ message: 'User not found!' })
    }

    const userFound = await User.findOne({ username }).lean().exec()

    if (!userFound) {
        return res.status(409).json({ message: 'User not found!' })
    }

    const isMatch = await bcrypt.compare(password, userFound.password)

    if (!isMatch) {
        res.status(400).json({ message: 'Password inncorect' })
    }

    const userObject = jwt.sign({ role: userFound.role, expiresIn: 60 * 60 }, config.get("secretKey"), { expiresIn: 60 * 60 })

    const user = ({ id: userFound._id, userObject, name: userFound.name, tokenExpiration: 60 * 60 + Math.floor(new Date().getTime() / 1000), role: userFound.role })

    if (user) {
        res.status(201).json({
            loginUser: {
                id: user.id,
                token: user.userObject,
                name: user.name,
                tokenExpiration: user.tokenExpiration,
                role: user.role
            }, message: `${username} your login is successfully!`
        })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }
})

const updateUser = asyncHandler(async (req, res) => {
    if (!req.isAuth || req.role !== "admin") {
        return new Error('You can not get users! Please login again!')
    }

    const { id, name, username } = req.body

    if (!name || !username) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const user = await User.findOne({ _id: id }).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    const duplicate = await User.findOne({ username }).lean().exec()

    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    user.name = name
    user.username = username

    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.username} updated` })
})

const changePassword = asyncHandler(async (req, res) => {

    if (!req.isAuth || (req.role !== "admin" && req.role !== "user")) {
        return new Error('You can not change password! Please login again!')
    }

    const { id, password, newPassword, confirmation } = req.body

    if (!password || !newPassword || !confirmation) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    if (newPassword != confirmation) {
        return res.status(400).json({ message: 'New password and confirmation does not match!' })
    }

    const user = await User.findOne({ _id: id }).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        res.status(400).json({ message: 'Password inncorect' })
    }
    const isMatch2 = await bcrypt.compare(password, newPassword)

    if (isMatch2) {
        return res.status(400).json({ message: 'New password cannot be the the same!' })
    }
    if (newPassword) {
        user.password = await bcrypt.hash(newPassword, 10)
    }

    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.username} password has been changed successfully!` })

})

const deleteUser = asyncHandler(async (req, res) => {
    if (!req.isAuth || req.role !== "admin") {
        return next(new Error('You can not get users! Please login again!'))
    }

    const { id } = req.body

    if (!id) {
        return res.status(400).json({ message: 'User ID Required' })
    }

    const user = await User.findOne({ _id: id }).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    const result = await user.deleteOne()

    res.json({ message: `Username ${result.username} with ID ${result._id} deleted` })
})



module.exports = {
    createNewUser,
    getAllUsers,
    ordinaryUsers,
    findUser,
    updateUser,
    deleteUser,
    login,
    changePassword
}