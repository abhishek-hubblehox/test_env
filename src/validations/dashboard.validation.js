const Joi = require('joi');

const getCounts = {
  params: Joi.object().keys({
    masterProjectId: Joi.string().required(),
    surveyId: Joi.string().required(),
    surveyFormId: Joi.string().required(),
  }),
};

module.exports = {
  getCounts,
};
