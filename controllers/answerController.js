const asyncHandler = require('express-async-handler')
const Answer = require('../models/Answer')

const createAnswer = asyncHandler(async (req, res) => {
    if (!req.isAuth || req.role !== 'user') {
        return res.status(400).json({ message: 'You can not add answer! Please login again' })
    }

    const { question, user, answer } = req.body
    if (!answer) {
        return res.status(400).json({ message: 'Please answer the question' })
    }

    const newAnswer = await Answer.create({ question, user, answer, answerDate: new Date().toISOString() })

    res.json(newAnswer)
})

const updateAnswer = asyncHandler(async (req, res) => {
    if (!req.isAuth || req.role !== 'user') {
        return res.status(400).json({ message: 'You can not update answer! Please login again' })
    }

    const { id, answer } = req.body
    if (!answer) {
        return res.status(400).json({ message: 'Please, answer the question' })
    }

    const updatedAnswer = await Answer.findByIdAndUpdate({ _id: id }, { $set: { answer } }, { new: true })

    res.json(updatedAnswer)
})

const deleteAnswer = asyncHandler(async (req, res) => {
    if (!req.isAuth || req.role !== 'user') {
        return res.status(400).json({ message: 'You can not delete answer! Please login again' })
    }

    const { id } = req.body

    const newAnswer = await Answer.findByIdAndDelete({ _id: id })

    res.json(newAnswer)
})

module.exports = {
    createAnswer,
    updateAnswer,
    deleteAnswer
}