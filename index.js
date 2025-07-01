require("dotenv").config();
const express = require("express");
const app = express();

const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");
const { logger, logEvents } = require("./middleware/logger");
const ClientController = require("./controllers/clientController");
const QuestionController = require("./controllers/questionController");
const AnswerController = require("./controllers/answerController");
const UtilitiesController = require("./controllers/utilities");
const MessageController = require("./controllers/messageController");
const UsersController = require("./controllers/usersController");
const BankAccountController = require("./controllers/bankAccountController");
const ReportController = require("./controllers/reportController");
const ScheduleController = require("./controllers/scheduleController");
const errorHandler = require("./middleware/errorHandler");
const isAuth = require("./middleware/is-auth");

const PORT = process.env.PORT || 3500;

//console.log(process.env.NODE_ENV) //environmental variables

connectDB();

app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/createAnswer", isAuth, AnswerController.createAnswer);
app.use("/updateAnswer", isAuth, AnswerController.updateAnswer);
app.use("/deleteAnswer", isAuth, AnswerController.deleteAnswer);

app.use("/createQuestion", QuestionController.createQuestion);
app.use("/questions", QuestionController.questions);
app.use("/deleteQuestion", isAuth, QuestionController.deleteQuestion);

app.use("/addBankAccount", BankAccountController.addBankAccountToClient);

app.use('/createMessage', MessageController.createMessage);
app.use('/deleteMessage', MessageController.deleteMessage);
app.use('/findUnreadMessagesByUser', MessageController.findUnreadMessagesByUser);
app.use('/findUnreadMessagesByUserAndClient', MessageController.findUnreadMessagesByUserAndClient);
app.use('/updateMessages', MessageController.updateMessages);
app.use("/messages", MessageController.messages);

app.use('/createNewClient', ClientController.createNewClient);
app.use("/findClient", ClientController.findClient);
app.use("/findClients", isAuth, ClientController.findClients);
app.use("/updateClient", ClientController.updateClient);
app.use("/deleteClient", isAuth, ClientController.deleteClient);
app.use("/loginClient", ClientController.loginClient);
app.use("/changeClientPassword", ClientController.changeClientPassword);
app.use("/clients", ClientController.clients);
app.use("/findBankAccounts", ClientController.findBankAccounts)

app.use("/createReport", ReportController.createReport);
app.use("/reports", ReportController.reports);
app.use("/report", ReportController.report);
app.use("/updateReport", ReportController.updateReport);
app.use("/deleteReport", ReportController.deleteReport);

app.use("/createSchedule", ScheduleController.createSchedule);
app.use("/schedules", ScheduleController.schedules);
app.use("/schedulesByDate", ScheduleController.schedulesByDate);
app.use("/requestSchedule", ScheduleController.requestSchedule);
app.use("/requestsByUser", ScheduleController.requestsByUser);
app.use("/deleteRequestSchedule", ScheduleController.deleteRequestSchedule);
app.use("/deleteRequestById", ScheduleController.deleteRequestById);

app.use("/createNewUser", isAuth, UsersController.createNewUser);
app.use("/getAllUsers", isAuth, UsersController.getAllUsers);
app.use("/ordinaryUsers", isAuth, UsersController.ordinaryUsers);
app.use("/findUser", isAuth, UsersController.findUser);
app.use("/updateUser", isAuth, UsersController.updateUser);
app.use("/deleteUser", isAuth, UsersController.deleteUser);
app.use("/login", UsersController.login);
app.use("/changePassword", isAuth, UsersController.changePassword);

app.use("/findQuestionById", UtilitiesController.findQuestionById);
app.use("/findUserById", UtilitiesController.findUserById);
app.use("/findAnswersByQuestionId", UtilitiesController.findAnswersByQuestionId);
app.use("/findClientById", UtilitiesController.findClientById);

app.all("*", (req, res) => {
  res.status(404);

  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepted("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);

  logEvents(
    `${err.no}> ${err.code}\t${err.syscall}/t${err.hostname}`,
    "mongoErrLog.log"
  );
});
