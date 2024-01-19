const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createNewSurvey = {
  body: Joi.object().keys({
    surveyName: Joi.string().required(),
    surveyId: Joi.string().required(),
    surveyPurpose: Joi.string().required(),
    surveyStartDate: Joi.date().required(),
    surveyEndDate: Joi.date().required(),
    surveyOwnerName: Joi.string().required(),
    surveyOwnerEmailId: Joi.string().required(),
    surveyOwnerMoNumber: Joi.number().required(),
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
      surveyName: Joi.string(),
      surveyId: Joi.string(),
      surveyPurpose: Joi.string(),
      surveyStartDate: Joi.string(),
      surveyEndDate: Joi.string(),
      surveyOwnerName: Joi.string(),
      surveyOwnerEmailId: Joi.string(),
      surveyOwnerMoNumber: Joi.number(),
    })
    .min(1),
};

const deleteNewSurvey = {
  params: Joi.object().keys({
    newSurveyId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createNewSurvey,
  getNewSurveys,
  getNewSurvey,
  updateNewSurvey,
  deleteNewSurvey,
};
