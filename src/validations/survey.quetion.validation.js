const Joi = require('joi');

const createSurveyQuetions = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    questions: Joi.array()
      .items(
        Joi.object({
          type: Joi.string().required(),
          name: Joi.string().required(),
          title: Joi.string().required(),
          choices: Joi.array().items(Joi.string()), // Add this line if 'choices' is optional
        })
      )
      .required(),
    createdBy: Joi.string().required(),
  }),
};

const getSurveyQuetions = {
  query: Joi.object().keys({
    title: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getSurveyQuetionById = {
  params: Joi.object().keys({
    surveyId: Joi.string(),
  }),
};

const updateSurveyQuetion = {
  params: Joi.object().keys({
    surveyId: Joi.string(),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      questions: Joi.array().items(
        Joi.object({
          type: Joi.string(),
          name: Joi.string(),
          title: Joi.string(),
          choices: Joi.array().items(Joi.string()), // Add this line if 'choices' is optional
        })
      ),
      createdBy: Joi.string(),
    })
    .min(1),
};

const deleteSurveyQuetion = {
  params: Joi.object().keys({
    surveyId: Joi.string(),
  }),
};

module.exports = {
  createSurveyQuetions,
  getSurveyQuetions,
  getSurveyQuetionById,
  updateSurveyQuetion,
  deleteSurveyQuetion,
};
