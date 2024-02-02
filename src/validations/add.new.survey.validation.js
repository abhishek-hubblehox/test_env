const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createNewSurvey = {
  body: Joi.object().keys({
    surveyName: Joi.string().required(),
    surveyId: Joi.string(),
    surveyPurpose: Joi.string().required(),
    surveyStartDate: Joi.date().required(),
    surveyEndDate: Joi.date().required(),
    masterProjectOwnerEmailId: Joi.string().required(),
    masterProjectId: Joi.string().required(),
  }),
};

const getNewSurveys = {
  query: Joi.object().keys({
    surveyName: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getNewSurvey = {
  params: Joi.object().keys({
    newSurveyId: Joi.string().custom(objectId),
  }),
};

const updateNewSurvey = {
  params: Joi.object().keys({
    newSurveyId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      surveyFormId: Joi.string(),
      surveyName: Joi.string(),
      surveyId: Joi.string(),
      surveyPurpose: Joi.string(),
      surveyStartDate: Joi.date(),
      surveyEndDate: Joi.date(),
    })
    .min(1),
};

const deleteNewSurvey = {
  params: Joi.object().keys({
    newSurveyId: Joi.string().custom(objectId),
  }),
};

const getSurveysByEmail = {
  params: Joi.object().keys({
    masterProjectOwnerEmailId: Joi.string(),
    masterProjectId: Joi.string(),
  }),
};

module.exports = {
  createNewSurvey,
  getNewSurveys,
  getNewSurvey,
  updateNewSurvey,
  deleteNewSurvey,
  getSurveysByEmail,
};
