const Joi = require('joi');

const bulkUploadValidationSchema = {
  surveyName: Joi.string().required(),
  surveyId: Joi.string(),
  surveyPurpose: Joi.string().required(),
  surveyStartDate: Joi.date().required(),
  surveyEndDate: Joi.date().required(),
  surveyOwnerName: Joi.string().required(),
  surveyOwnerEmailId: Joi.string().required(),
  surveyOwnerMoNumber: Joi.number().required(),
  surveyConductBy: Joi.string(),
  surveyRequireAudit: Joi.string(),
  surveyAuditBy: Joi.string(),
  surveyRequireApproval: Joi.string(),
  surveyApprovedBy: Joi.string(),
  file: Joi.string().required(),
};
const getAllSurveyLocatins = {
  query: Joi.object().keys({
    surveyId: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};
const getSchoolDataBySurveyId = {
  params: Joi.object().keys({
    surveyId: Joi.string(),
  }),
};

module.exports = {
  bulkUploadValidationSchema,
  getAllSurveyLocatins,
  getSchoolDataBySurveyId,
};
