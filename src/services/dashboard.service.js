const { SurveyLocation, SurveyAnswers } = require('../models');

/**
 * Get counts of locations, surveyed locations, and pending locations based on masterProjectId
 * @param {String} masterProjectId - ID of the master project
 * @param {String} surveyId - ID of the master project
 * @param {String} surveyFormId - ID of the master project
 * @returns {Promise<{ totalLocations: number, totalSurveyed: number, totalPending: number }>}
 */

const getLocationCounts = async (masterProjectId, surveyId, surveyFormId) => {
  // Get udise_sch_code from SurveyLocation
  const surveyLocation = await SurveyLocation.findOne({ masterProjectId });
  const udiseCodes = surveyLocation.surveyLocations.map((location) => location.udise_sch_code);
  const totalLocations = new Set(udiseCodes).size;
  // Get total surveyed locations
  const totalSurveyed = await SurveyAnswers.countDocuments({
    masterProjectId,
    surveyId,
    surveyFormId,
    udise_sch_code: { $in: udiseCodes },
  });

  // Calculate total pending locations
  const totalPending = totalLocations - totalSurveyed;

  return { totalLocations, totalSurveyed, totalPending };
};

module.exports = {
  getLocationCounts,
};
