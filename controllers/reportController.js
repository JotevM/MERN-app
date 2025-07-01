const Report = require('../models/Report')
const asyncHandler = require('express-async-handler')
const { findReportById, findClientById } = require('./utilities')

const createReport = asyncHandler(async (req, res) => {
    const { date, description, client } = req.body

    if (!date || !description || !client) {
        return res.status(400).json({ message: 'All fields are required.' })
    }

    const newReport = await Report.create({ date, description, client })

    if (newReport) {
        res.status(201).json({ message: `New report for ${client} created` })
    } else {
        res.status(400).json({ message: 'Invalid report data received' })
    }
})

const reports = asyncHandler(async (req, res) => {

    const { id } = req.query

    const rep = await Report.find({ client: id })

    if (!rep?.length) {
        return res.status(400).json({ message: 'No reports found' })
    }

    const r = await Promise.all(
        rep.map(async (re) => {
            const client = await findClientById(re.client)
            return { ...re._doc, client }
        })
    )
    res.json(r)
})

const report = asyncHandler(async (req, res) => {
    const rep = await Report.find({})

    if (!rep?.length) {
        return res.status(400).json({ message: 'No reports found' })
    }

    const r = await Promise.all(
        rep.map(async (re) => {
            const client = await findClientById(re.client)
            return { ...re._doc, client }
        })
    )
    res.json(r)
})

const updateReport = asyncHandler(async (req, res) => {
    const { id, date, description } = req.body

    if (!date || !description) {
        return res.status(400).json({ message: 'All fields are required.' })
    }

    const rep = await Report.findByIdAndUpdate({ _id: id }, { $set: { date, description } }, { new: true })

    if (rep) {
        res.status(201).json({ message: `Report is successfully updated` })
    } else {
        res.status(400).json({ message: 'Invalid report data received' })
    }
})

const deleteReport = asyncHandler(async (req, res) => {
    const { id } = req.body

    const rep = await Report.findByIdAndDelete({ _id: id })

    if (rep) {
        res.status(201).json({ message: `Report ${id} is deleted` })
    } else {
        res.status(400).json({ message: 'Invalid report data received' })
    }
})

module.exports = {
    createReport,
    reports,
    report,
    updateReport,
    deleteReport
}