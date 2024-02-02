const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const surveyAnswerSchema = new mongoose.Schema({
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
surveyAnswerSchema.plugin(toJSON);
surveyAnswerSchema.plugin(paginate);

const surveyAnswer = mongoose.model('surveyAnswer', surveyAnswerSchema);

module.exports = surveyAnswer;
