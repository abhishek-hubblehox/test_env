const { SurveyLocation } = require('../models');

const bulkUpload = async (locationsArray, surveyDetails) => {
  if (!locationsArray || !locationsArray.length) {
    throw new Error('Missing array');
  }

  const surveyLocation = new SurveyLocation(surveyDetails);
  //   const transformedLocations = locationsArray.map((location) => ({
  //     udise_sch_code: { udise_sch_code: location.udise_sch_code },
  //     surveyor_Email_Id: { surveyor_Email_Id: location.surveyor_Email_Id },
  //     SME_Email_Id: { SME_Email_Id: location.SME_Email_Id },
  //     approver_Email_Id: { approver_Email_Id: location.approver_Email_Id },
  //   }));

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
