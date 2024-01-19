const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { newSurveyService } = require('../services');

const createNewSurvey = catchAsync(async (req, res) => {
  const NewSurvey = await newSurveyService.createNewSurvey(req.body);
  res.status(httpStatus.CREATED).send(NewSurvey);
});

const queryNewSurvey = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['surveyName']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await newSurveyService.queryNewSurvey(filter, options);
  res.send(result);
});

const getNewSurvey = catchAsync(async (req, res) => {
  const NewSurvey = await newSurveyService.getNewSurveyById(req.params.newSurveyId);
  if (!NewSurvey) {
    throw new ApiError(httpStatus.NOT_FOUND, 'NewSurveynot found');
  }
  res.send(NewSurvey);
});

const updateNewSurvey = catchAsync(async (req, res) => {
  const NewSurvey = await newSurveyService.updateNewSurveyById(req.params.newSurveyId, req.body);
  res.send(NewSurvey);
});

const deleteNewSurvey = catchAsync(async (req, res) => {
  await newSurveyService.deleteNewSurveyById(req.params.newSurveyId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createNewSurvey,
  queryNewSurvey,
  getNewSurvey,
  updateNewSurvey,
  deleteNewSurvey,
};
