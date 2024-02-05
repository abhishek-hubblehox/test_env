const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const smeSurveyAnswerSchema = new mongoose.Schema({
  surveyQuetions: [
    {
      quetion: {
        type: String,
      },
      answer: {
        type: String,
      },
    },
  ],
  surveyId: {
    type: String,
  },
  masterProjectId: {
    type: String,
  },
  udise_sch_code: {
    type: Number,
  },
  surveyFormId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'surveyQuetions',
    required: true,
    trim: true,
  },
  surveyConductEmail: {
    type: String,
  },
});

// add plugin that converts mongoose to json
smeSurveyAnswerSchema.plugin(toJSON);
smeSurveyAnswerSchema.plugin(paginate);
/* eslint-disable camelcase */
const SME_SurveyAnswer = mongoose.model('SME-SurveyAnswer', smeSurveyAnswerSchema);

module.exports = SME_SurveyAnswer;
/* eslint-enable camelcase */
