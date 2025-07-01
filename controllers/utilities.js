const Question = require('../models/Question')

const User = require('../models/User')

const Client = require('../models/Client')

const Answer = require('../models/Answer')

const asyncHandler = require('express-async-handler')




const findQuestionById = asyncHandler(async (req, res) => {

  const { id } = req.params



  const question = await Question.findOne({ _id: id })



  if (question) {

    return res.json({ ...question._doc })

  }

  else {

    return res.status(500).json({ message: 'Error finding question' })

  }

})



const findUserById = asyncHandler(async (userId) => {

  try {

    const user = await User.findOne({ _id: userId });

    return user;

  } catch (error) {

    throw new Error('Error finding user');

  }

});

const findAnswersByQuestionId = asyncHandler(async (id) => {
  //const { id } = req.params;
  const answers = await Answer.find({ question: id });

  const userIds = answers.map(answer => answer.user);
  const users = await Promise.all(userIds.map(userId => findUserById(userId)));

  const resolvedAnswers = answers.map((answer, index) => ({
    answer: answer.answer,
    answerDate: answer.answerDate,
    user: {
      id: users[index]?._id,
      username: users[index]?.username,
      name: users[index]?.name,
    }
  }));

  return {resolvedAnswers};
})

const findClientById = asyncHandler(async (clientId) => {
  try{  
      const client = await Client.findOne({_id: clientId})
      return client;
  } catch (error) {
    throw new Error('Error finding client');
  }
})



module.exports = {

  findAnswersByQuestionId,

  findClientById,

  findQuestionById,

  findUserById

}