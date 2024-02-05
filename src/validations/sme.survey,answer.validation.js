const Joi = require('joi');

const createSurveyAnswers = {
  body: Joi.object().keys({
    surveyQuetions: Joi.array()
      .items(
        Joi.object({
          quetion: Joi.string().required(),
          answer: Joi.string().required(),
        })
      )
      .required(),
    surveyId: Joi.string().required(),
    masterProjectId: Joi.string().required(),
    surveyFormId: Joi.string().required(),
    udise_sch_code: Joi.number().required(),
    surveyConductEmail: Joi.string().required(),
  }),
};

const getSurveyAnswers = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getSurveyAnswerById = {
  params: Joi.object().keys({
    answerId: Joi.string(),
  }),
};

const updateSurveyAnswer = {
  params: Joi.object().keys({
    answerId: Joi.string(),
  }),
  body: Joi.object()
    .keys({
      surveyQuetions: Joi.array().items(
        Joi.object({
          quetion: Joi.string(),
          answer: Joi.string(),
        })
      ),
      surveyId: Joi.string(),
      masterProjectId: Joi.string(),
      surveyFormId: Joi.string(),
      surveyConductEmail: Joi.string(),
    })
    .min(1),
};

const deleteSurveyAnswer = {
  params: Joi.object().keys({
    answerId: Joi.string(),
  }),
};

const filterSurveyAnswer = {
  params: Joi.object().keys({
    surveyId: Joi.string().required(),
    masterProjectId: Joi.string().required(),
    surveyFormId: Joi.string().required(),
    surveyConductEmail: Joi.string().required(),
    udise_sch_code: Joi.number().required(),
  }),
};

module.exports = {
  createSurveyAnswers,
  getSurveyAnswers,
  getSurveyAnswerById,
  updateSurveyAnswer,
  deleteSurveyAnswer,
  filterSurveyAnswer,
};
