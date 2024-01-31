const httpStatus = require('http-status');
const { join } = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const csv = require('csvtojson');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const { surveyLocationService } = require('../services');

const staticFolder = join(__dirname, '../');
const uploadsFolder = join(staticFolder, 'uploads');

const bulkUploadFile = catchAsync(async (req, res) => {
  if (req.file) {
    if (req.file.mimetype !== 'text/csv') {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Uploaded file must be in CSV format.');
    }
    const csvFilePath = join(uploadsFolder, req.file.filename);
    const csvJsonArray = await csv().fromFile(csvFilePath);
    const result = await surveyLocationService.bulkUpload(csvJsonArray, req.body);
    res.status(httpStatus.CREATED).send(result);
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, 'Missing file');
  }
});

const getAllSurveyLocatins = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['surveyId', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await surveyLocationService.getAllSurveyLocatins(filter, options);
  res.send(result);
});

const getSchoolDataBySurveyId = catchAsync(async (req, res) => {
  const { masterProjectId } = req.params;
  const result = await surveyLocationService.getSchoolDataBySurveyId(masterProjectId);
  res.status(httpStatus.OK).json(result);
  if (!result) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
});

module.exports = {
  bulkUploadFile,
  getAllSurveyLocatins,
  getSchoolDataBySurveyId,
};
