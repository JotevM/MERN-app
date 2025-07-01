const Schedule = require("../models/Schedule");
const Request = require("../models/Request")
const asyncHandler = require("express-async-handler");
const { findUserById, findClientById } = require("./utilities");

const createSchedule = asyncHandler(async (req, res) => {
    const d = new Date();
    //res.status(200).json({message: `${d.getDate()}`})

    const { user, client, date, time } = req.body;
    if (!user || !client || !date || !time) {
        return res.status(400).json({ message: "All fields are required." });
    }

    const duplicate = await Schedule.findOne({ user, date, time });

    if (duplicate) {
        return res
            .status(409)
            .json({ message: `Already have schedule for ${(date, time)}` });
    }

    const scheduleObject = { user, client, date, time };

    const sched = await Schedule.create(scheduleObject);

    if (sched) {
        res
            .status(201)
            .json({ message: `New schedule for ${(date, time)} created` });
    } else {
        res.status(400).json({ message: "Invalid schedule data received" });
    }
});

const schedules = asyncHandler(async (req, res) => {
    //const { id } = req.query;
    //console.log(id)

   /* const scheduleObject = {
        id,
        date: { $gte: new Date().toISOString().slice(0, 10) },
    };
*/
    const sched = await Schedule.find(
      //  { client: id }
    ).sort({ date: 1, time: 1 });

    console.log("sched", sched);
    if (!sched?.length) {
        return res.status(400).json({ message: "No schedules found" });
    }

    const s = await Promise.all(
        sched.map(async (schedule) => {
            const user = await findUserById(schedule.user);
            const client = await findClientById(schedule.client);
            return { ...schedule._doc, user, client };
        })
    );

    res.json(s);
}); 

const schedulesByDate = asyncHandler(async (req, res) => {
    const user = req.body.user;
    let date = req.body.date;

    if (!(date instanceof Date)) {
        date = new Date(date);
      }
    date = date.toISOString().substring(0, 10)
    console.log(user, date)
    const scheduleObject = { user, date };
    const sched = await Schedule.find(scheduleObject);
    console.log("sched", sched);

    if (!sched?.length) {
        return res.status(400).json({ message: "No schedules found" });
    }

    const s = await Promise.all(
        sched.map(async (schedule) => {
            const user = await findUserById(schedule.user);
            const client = await findClientById(schedule.client);
            return { ...schedule._doc, user, client };
        })
    );

    res.json(s);
});

const requestSchedule = asyncHandler(async (req, res) => {
    const { user, client, date, time } = req.body;

    console.log(user, client, date, time)
    if (!user || !client || !date || !time) {
        res.status(400).json({ message: "All fields are required." });
    }

    const duplicate = await Request.findOne({
        client,
        requestDate: new Date().toISOString().slice(0, 10),
    });

    if (duplicate) {
        return res.status(409).json({
            message: `Already have requested appointment for ${date}, ${time}`,
        });
    }

    const dup = await Request.findOne({ user, date, time });

    if (dup) {
        return res
            .status(409)
            .json({ message: `Already have schedule for ${date}, ${time}` });
    }

    const requestObject = { user, client, date, time };

    const request = await Request.create(requestObject);

    if (request) {
        res
            .status(201)
            .json({ message: `New request for ${date}, ${time} created` });
    } else {
        res.status(400).json({ message: "Invalid request data received" });
    }
});

const requestsByUser = asyncHandler(async (req, res) => {
    const { id } = req.query;
    console.log(id)

    if (!id) {
        return res.status(400).json({ message: "User ID Required" });
    }

    const request = await Request.find({ user: id });
    console.log("request", request);

   /* if (!request?.length) {
        return res.status(400).json({ message: "No request found" });
    }*/

    const s = await Promise.all(
        request.map(async (reque) => {
            const user = await findUserById(reque.user);
            const client = await findClientById(reque.client);
            return { ...reque._doc, user, client };
        })
    );

    //const s = {...request._doc,user:findUserById(request.user), client:findClientById(request.client)}

    res.json(s);
});

const deleteRequestSchedule = asyncHandler(async (req, res) => {
    const { id } = req.body;
    console.log(id)

    if (!id) {
        return res.status(400).json({ message: "User ID Required" });
    }

    const request = await Request.findOne({user: id}).exec();

    if (!request) {
        return res.status(400).json({ message: "Request not found" });
    }

    const result = await request.deleteOne();

    const reply = `Request for ${(result.date, result.time)} with ID ${result._id
        } deleted`;

    res.json(reply);
});

const deleteRequestById = asyncHandler(async (req, res) => {
    const id  = req.body._id;

    console.log("REQUEST IDDDDDDDDDDDDDD",id)
    if (!id) {
        return res.status(400).json({ message: "Request ID Required" });
    }

    const sched = await Request.findOne({_id: id}).exec();

    if (!sched) {
        return res.status(400).json({ message: "Request not found" });
    }

    const result = await sched.deleteOne();

    const reply = `Request for ${(result.date, result.time)} with ID ${result._id
        } deleted`;

    res.json(reply);
});

module.exports = {
    createSchedule,
    schedules,
    schedulesByDate,
    requestSchedule,
    requestsByUser,
    deleteRequestSchedule,
    deleteRequestById,
};
