const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const newMasterSurveySchema = new mongoose.Schema({
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
    default: '',
  },
  masterProjectRequireAudit: {
    type: Boolean,
    default: false,
  },
  masterProjectAuditBy: {
    type: String,
    default: '',
  },
  masterProjectRequireApproval: {
    type: Boolean,
    default: false,
  },
  masterProjectApprovedBy: {
    type: String,
    default: '',
  },
  auditStartDate: {
    type: Date,
    required: true,
  },
  auditEndDate: {
    type: Date,
    required: true,
  },
  approvelStartDate: {
    type: Date,
    required: true,
  },
  approvelEndDate: {
    type: Date,
    required: true,
  },
  finalSubmit: {
    type: Boolean,
    default: false,
  },
  projectStatus: {
    type: String,
    enum: ['Not-Started', 'Started', 'In-progress', 'Completed'],
    default: 'Not-Started',
  },
});

function generateRandomString(length, characters) {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

newMasterSurveySchema.pre('save', function (next) {
  const randomLetters = generateRandomString(4, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'); // generate 4 random letters
  const randomDigits = generateRandomString(4, '0123456789'); // generate 4 random digits
  this.masterProjectId = `${randomLetters}${randomDigits}`;
  next();
});

// add plugin that converts mongoose to json
newMasterSurveySchema.plugin(toJSON);
newMasterSurveySchema.plugin(paginate);

const MasterProject = mongoose.model('MasterProject', newMasterSurveySchema);

module.exports = MasterProject;
