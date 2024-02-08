const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { DashboardServices } = require('../services');
const ApiError = require('../utils/ApiError');

const getLocationCounts = catchAsync(async (req, res, next) => {
  try {
    const { masterProjectId, surveyId, surveyFormId } = req.params;
    const counts = await DashboardServices.getLocationCounts(masterProjectId, surveyId, surveyFormId);
    res.status(httpStatus.OK).json(counts);
  } catch (error) {
    next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error', error));
  }
});

module.exports = {
  getLocationCounts,
};
