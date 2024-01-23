const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const newSurveySchema = new mongoose.Schema({
  surveyName: {
    type: String,
  },
  surveyId: String,
  surveyPurpose: String,
  surveyStartDate: Date,
  surveyEndDate: Date,
  surveyOwnerName: String,
  surveyOwnerEmailId: String,
  surveyOwnerMoNumber: Number,
});

// add plugin that converts mongoose to json
newSurveySchema.plugin(toJSON);
newSurveySchema.plugin(paginate);

const NewSurvey = mongoose.model('NewSurvey', newSurveySchema);

module.exports = NewSurvey;
