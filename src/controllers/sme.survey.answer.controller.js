const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { smeSurveyAnswerService } = require('../services');

const createSurveyAnswers = catchAsync(async (req, res) => {
  const quetion = await smeSurveyAnswerService.createSurveyAnswers(req.body);
  res.status(httpStatus.CREATED).send(quetion);
});

const getSurveyAnswers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await smeSurveyAnswerService.querySurveyAnswers(filter, options);
  res.send(result);
});

const getSurveyAnswer = catchAsync(async (req, res) => {
  const answer = await smeSurveyAnswerService.getSurveyAnswersBySurveyId(req.params.answerId);
  if (!answer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Survey Answers not found');
  }
  res.send(answer);
});

const updateSurveyAnswers = catchAsync(async (req, res) => {
  const answer = await smeSurveyAnswerService.updateSurveyAnswersBysurveyId(req.params.answerId, req.body);
  res.send(answer);
});

const deleteSurveyAnswers = catchAsync(async (req, res) => {
  await smeSurveyAnswerService.deleteSurveyAnswersBysurveyId(req.params.answerId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createSurveyAnswers,
  getSurveyAnswers,
  getSurveyAnswer,
  updateSurveyAnswers,
  deleteSurveyAnswers,
};
