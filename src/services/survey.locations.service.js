const { SurveyLocation, School } = require('../models');

const bulkUpload = async (locationsArray, surveyDetails) => {
  if (!locationsArray || !locationsArray.length) {
    throw new Error('Missing array');
  }

  // Check if a survey with the given surveyId already exists
  const existingSurvey = await SurveyLocation.findOne({ masterProjectId: surveyDetails.masterProjectId });

  if (existingSurvey) {
    // If the survey exists, update the surveyLocations property
    existingSurvey.surveyLocations = [
      ...existingSurvey.surveyLocations,
      ...locationsArray.map((location) => {
        return {
          udise_sch_code: location.udise_sch_code,
        };
      }),
    ];

    const result = await existingSurvey.save();
    const data = { result, schools: [] }; // Since we are not creating a new SurveyLocation, schools array is empty
    return data;
  }

  // If the surveyId does not exist, create a new SurveyLocation
  const schools = await School.find({ udise_sch_code: { $in: locationsArray.map((location) => location.udise_sch_code) } });
  const surveyLocation = {
    ...surveyDetails,
    surveyLocations: await Promise.all(
      locationsArray.map(async (location) => {
        const matchingSchool = schools.find((school) => school.udise_sch_code === location.udise_sch_code);
        const schoolData = matchingSchool ? await School.findById(matchingSchool._id) : null;
        return {
          ...location,
          school: schoolData || null,
        };
      })
    ),
  };

  const newSurveyLocation = await SurveyLocation.create(surveyLocation);
  const data = { result: newSurveyLocation, schools };
  return data;
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

/**
 * Get school data by surveyId
 * @param {String} masterProjectId
 * @returns {Promise<School[]>}
 */
const getSchoolDataBySurveyId = async (masterProjectId) => {
  const surveyLocation = await SurveyLocation.findOne({ masterProjectId });
  if (!surveyLocation) {
    throw new Error('Survey location not found');
  }
  const udiseSchCodes = surveyLocation.surveyLocations.map((location) => location.udise_sch_code);
  const schools = await School.find({ udise_sch_code: { $in: udiseSchCodes } });
  return schools;
};

// /**
//  * Get school data by masterProjectId, role, and code
//  * @param {String} masterProjectId
//  * @param {String} role - Role of the coordinator (block, district, division, etc.)
//  * @param {String} code - Code associated with the role (block_cd_1, district_cd, Division name, etc.)
//  * @returns {Promise<School[]>}
//  */
// const getSchoolDataByMasterProjectIdAndCode = async (masterProjectId, role, code) => {
//   console.log(masterProjectId, role, code);
//   const surveyLocation = await SurveyLocation.findOne({ masterProjectId });
//   if (!surveyLocation) {
//     throw new Error('Survey location not found');
//   }

//   let filteredSchools = [];
//   const udiseSchCodes = surveyLocation.surveyLocations.map((location) => location.udise_sch_code);
//   const schools = await School.find({ udise_sch_code: { $in: udiseSchCodes } });
//   switch (role) {
//     case 'block':
//       filteredSchools = schools.filter((school) => school.block_cd_1 === code);
//       break;
//     case 'district':
//       filteredSchools = schools.filter((school) => school.district_cd === code);
//       break;
//     case 'division':
//       filteredSchools = schools.filter((school) => school.Division === code);
//       break;
//     // Add more cases as needed for other roles
//     default:
//       // Handle default case
//       break;
//   }

//   return filteredSchools;
// };

/**
 * Get school data by masterProjectId, role, and code
 * @param {String} masterProjectId
 * @param {String} role - Role of the coordinator (block, district, division, etc.)
 * @param {String} code - Code associated with the role (block_cd_1, district_cd, Division name, etc.)
 * @returns {Promise<School[]>}
 */
const getSchoolDataByMasterProjectIdAndCode = async (masterProjectId, role, code) => {
  const surveyLocation = await SurveyLocation.findOne({ masterProjectId });
  if (!surveyLocation) {
    throw new Error('Survey location not found');
  }

  let filteredSchools = [];
  const udiseSchCodes = surveyLocation.surveyLocations.map((location) => location.udise_sch_code);
  const schools = await School.find({ udise_sch_code: { $in: udiseSchCodes } });
  let data;
  switch (role.toLowerCase()) {
    case 'block':
      data = Number(code);
      filteredSchools = schools.filter((school) => school.block_cd_1 === data);
      break;
    case 'district':
      data = Number(code);
      filteredSchools = schools.filter((school) => school.district_cd === data);
      break;
    case 'division':
      filteredSchools = schools.filter((school) => school.Division.toLowerCase() === code.toLowerCase());
      break;
    // Add more cases as needed for other roles
    default:
      // Handle default case
      break;
  }
  return filteredSchools;
};

module.exports = {
  bulkUpload,
  getAllSurveyLocatins,
  getSchoolDataBySurveyId,
  getSchoolDataByMasterProjectIdAndCode,
};
