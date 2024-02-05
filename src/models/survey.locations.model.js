const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const surveyLocationSchema = new mongoose.Schema({
  // surveyName: {
  //   type: String,
  //   required: true,
  // },
  // surveyId: {
  //   type: String,
  //   required: true,
  // },
  // surveyPurpose: {
  //   type: String,
  //   required: true,
  // },
  // surveyStartDate: {
  //   type: Date,
  //   required: true,
  // },
  // surveyEndDate: {
  //   type: Date,
  //   required: true,
  // },
  // surveyOwnerName: {
  //   type: String,
  //   required: true,
  // },
  // surveyOwnerEmailId: {
  //   type: String,
  //   required: true,
  // },
  // surveyOwnerMoNumber: {
  //   type: Number,
  //   required: true,
  // },
  // surveyConductBy: {
  //   type: String,
  //   required: true,
  // },
  // surveyRequireAudit: {
  //   type: Boolean,
  //   required: true,
  // },
  // surveyAuditBy: {
  //   type: String,
  //   required: true,
  // },
  // surveyRequireApproval: {
  //   type: Boolean,
  //   required: true,
  // },
  // surveyApprovedBy: {
  //   type: String,
  //   required: true,
  // },
  masterProjectName: {
    type: String,
    required: true,
  },
  masterProjectId: {
    type: String,
    unique: true,
  },
  masterProjectPurpose: {
    type: String,
    required: true,
  },
  masterProjectStartDate: {
    type: Date,
    required: true,
  },
  masterProjectEndDate: {
    type: Date,
    required: true,
  },
  masterProjectOwnerName: {
    type: String,
    required: true,
  },
  masterProjectOwnerEmailId: {
    type: String,
    required: true,
  },
  masterProjectOwnerMoNumber: {
    type: Number,
    required: true,
  },
  masterProjectConductBy: {
    type: String,
    // required: true,
  },
  masterProjectRequireAudit: {
    type: Boolean,
  },
  masterProjectAuditBy: {
    type: String,
  },
  masterProjectRequireApproval: {
    type: Boolean,
  },
  masterProjectApprovedBy: {
    type: String,
  },
  auditStartDate: {
    type: Date,
  },
  auditEndDate: {
    type: Date,
  },
  approvelStartDate: {
    type: Date,
  },
  approvelEndDate: {
    type: Date,
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
