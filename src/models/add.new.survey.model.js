const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const newSurveySchema = new mongoose.Schema({
  masterProjectOwnerEmailId: {
    type: String,
    required: true,
    format: 'email',
  },
  masterProjectId: {
    type: String,
    required: true,
  },
  surveyName: {
    type: String,
    required: true,
  },
  surveyId: {
    type: String,
    unique: true,
  },
  surveyPurpose: {
    type: String,
    required: true,
  },
  surveyStartDate: {
    type: Date,
    required: true,
  },
  surveyEndDate: {
    type: Date,
    required: true,
  },
  surveyFormId: {
    type: String,
    default:'',
  },
});

// add plugin that converts mongoose to json
newSurveySchema.plugin(toJSON);
newSurveySchema.plugin(paginate);

// pre-save middleware to generate unique surveyId

const NewSurvey = mongoose.model('NewSurvey', newSurveySchema);

module.exports = NewSurvey;
