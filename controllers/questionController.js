const Question = require('../models/Question')
const Answer = require('../models/Answer')
const { findAnswersByQuestionId } = require('./utilities')
const asyncHandler = require('express-async-handler')

const createQuestion = asyncHandler(async (req, res) => {
    const { name, question } = req.body

    if (!name || !question) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const newQuestion = await Question.create({ name, question, questionDate: new Date().toISOString() })

    if (newQuestion) {
        return res.status(200).json({ message: 'Question is asked' })
    }
    else {
        return res.status(400).json({ message: 'Invalid question data' })
    }
})

const questions = asyncHandler(async (req, res) => {

    const q = await Question.find({}).sort({ date: -1 })
    console.log(q)
    const processedQ = await Promise.all(
        q.map(async (question) => {
            //console.log(question._id, "QUEEEESTIONSSSSSSIDDDDDDDDD")
            const answers = await findAnswersByQuestionId(question._id)
            return { ...question._doc, answers }
        })
    )
    res.json(processedQ)
})

const deleteQuestion = asyncHandler(async (req, res) => {
    if (!req.isAuth || req.role !== "user") {
        return res.status(400).json({ message: 'You can not delete question! Please login again' })
    }

    const { id } = req.body

    const q = await Question.findByIdAndDelete(id)
    if (!q) {
        return res.status(400).json({ message: 'Question not found' })
    }

    res.json({ ...q._doc })
})

module.exports = {
    createQuestion,
    questions,
    deleteQuestion
}