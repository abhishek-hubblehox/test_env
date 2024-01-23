const { SurveyLocation } = require('../models');

const bulkUpload = async (locationsArray, surveyDetails) => {
  if (!locationsArray || !locationsArray.length) {
    throw new Error('Missing array');
  }
  const surveyLocation = new SurveyLocation(surveyDetails);
  surveyLocation.surveyLocations = locationsArray;

  const result = await surveyLocation.save();
  return result;
};

/**
 * Query for NewSurvey
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getAllSurveyLocatins = async (filter, options) => {
  const newSurveys = await SurveyLocation.paginate(filter, options);
  return newSurveys;
};
module.exports = {
  bulkUpload,
  getAllSurveyLocatins,
};
