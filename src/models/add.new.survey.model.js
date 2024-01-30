const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const newSurveySchema = new mongoose.Schema({
  masterProjectOwnerEmailId: {
    type: String,
    required: true,
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
});

// add plugin that converts mongoose to json
newSurveySchema.plugin(toJSON);
newSurveySchema.plugin(paginate);

// pre-save middleware to generate unique surveyId
newSurveySchema.pre('save', async function (next) {
  const surveyName = this.surveyName.replace(/\s+/g, '').toUpperCase();
  const randomNumbers = Math.floor(100 + Math.random() * 900); // generate random 3-digit number
  this.surveyId = `${surveyName.slice(0, 3)}${randomNumbers}`;
  next();
});

const NewSurvey = mongoose.model('NewSurvey', newSurveySchema);

module.exports = NewSurvey;
