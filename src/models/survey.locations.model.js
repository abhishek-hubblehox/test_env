const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const surveyLocationSchema = new mongoose.Schema({
  surveyName: {
    type: String,
    required: true,
  },
  surveyId: {
    type: String,
    required: true,
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
  surveyOwnerName: {
    type: String,
    required: true,
  },
  surveyOwnerEmailId: {
    type: String,
    required: true,
  },
  surveyOwnerMoNumber: {
    type: Number,
    required: true,
  },
  surveyConductBy: {
    type: String,
    required: true,
  },
  surveyRequireAudit: {
    type: Boolean,
    required: true,
  },
  surveyAuditBy: {
    type: String,
    required: true,
  },
  surveyRequireApproval: {
    type: Boolean,
    required: true,
  },
  surveyApprovedBy: {
    type: String,
    required: true,
  },
  surveyLocations: [
    {
      udise_sch_code: {
        type: Number,
      },
    },
  ],
});

// add plugin that converts mongoose to json
surveyLocationSchema.plugin(toJSON);
surveyLocationSchema.plugin(paginate);

const SurveyLocation = mongoose.model('SurveyLocation', surveyLocationSchema);

module.exports = SurveyLocation;
