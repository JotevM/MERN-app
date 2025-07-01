const { format } = require('date-fns') //rad sa datumima
const { v4:uuid } = require('uuid') //standard za generisanje jedinstvenih identifikatora, koristi se u bazama
const fs = require('fs') //standardni modul za citanje i pisanje datoteka i direktorijuma
const fsPromises = require('fs').promises //novi modul za iste funkcionalnosti, ali koristi async
const path = require('path')

const logEvents = async (message, logFileName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`

    try{
        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))){
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem)
    }
    catch(err) {
        console.log(err)
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log')
    console.log(`${req.method} ${req.path}`)
    next()
}

module.exports = { logEvents, logger}