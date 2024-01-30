const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createNewSurvey = {
  body: Joi.object().keys({
    surveyName: Joi.string().required(),
    surveyId: Joi.string(),
    surveyPurpose: Joi.string().required(),
    surveyStartDate: Joi.date().required(),
    surveyEndDate: Joi.date().required(),
    surveyOwnerName: Joi.string().required(),
    surveyOwnerEmailId: Joi.string().required(),
    surveyOwnerMoNumber: Joi.number().required(),
    surveyConductBy: Joi.string().allow(''),
    surveyRequireAudit: Joi.string(),
    surveyAuditBy: Joi.string().allow(''),
    surveyRequireApproval: Joi.string(),
    surveyApprovedBy: Joi.string().allow(''),
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
      surveyConductBy: Joi.string().required(),
      surveyRequireAudit: Joi.boolean(),
      surveyAuditBy: Joi.when('surveyRequireAudit', {
        is: true,
        then: Joi.string().required(),
        otherwise: Joi.string(),
      }),
      surveyRequireApproval: Joi.boolean(),
      surveyApprovedBy: Joi.when('surveyRequireApproval', {
        is: true,
        then: Joi.string().required(),
        otherwise: Joi.string(),
      }),
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
