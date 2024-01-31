const { SurveyLocation, School } = require('../models');

// const bulkUpload = async (locationsArray, surveyDetails) => {
//   if (!locationsArray || !locationsArray.length) {
//     throw new Error('Missing array');
//   }
//   const schools = await School.find({ udise_sch_code: { $in: locationsArray.map((location) => location.udise_sch_code) } });
//   const surveyLocation = {
//     ...surveyDetails,
//     surveyLocations: await Promise.all(
//       locationsArray.map(async (location) => {
//         const matchingSchool = schools.find((school) => school.udise_sch_code === location.udise_sch_code);
//         const schoolData = matchingSchool ? await School.findById(matchingSchool._id) : null;
//         return {
//           ...location,
//           school: schoolData || null,
//         };
//       })
//     ),
//   };
//   const result = await SurveyLocation.create(surveyLocation);
//   let data = { result, schools };
//   return data;
// };

const bulkUpload = async (locationsArray, surveyDetails) => {
  if (!locationsArray || !locationsArray.length) {
    throw new Error('Missing array');
  }

  // Check if a survey with the given surveyId already exists
  const existingSurvey = await SurveyLocation.findOne({ surveyId: surveyDetails.surveyId });

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
// const bulkUpload = async (locationsArray, surveyDetails) => {
//   if (!locationsArray || !locationsArray.length) {
//     throw new Error('Missing array');
//   }

//   // Check if a survey with the given surveyId already exists
//   const existingSurvey = await SurveyLocation.findOne({ surveyId: surveyDetails.surveyId });

//   if (existingSurvey) {
//     // If the survey exists, update the surveyLocations property
//     const uniqueCodes = new Set(existingSurvey.surveyLocations.map((loc) => loc.udise_sch_code));
//     locationsArray.forEach((location) => {
//       if (!uniqueCodes.has(location.udise_sch_code)) {
//         const matchingSchool = existingSurvey.surveyLocations.find(
//           (school) => school.udise_sch_code === location.udise_sch_code
//         );

//         if (!matchingSchool) {
//           existingSurvey.surveyLocations.push({
//             udise_sch_code: location.udise_sch_code,
//           });
//         }

//         uniqueCodes.add(location.udise_sch_code);
//       }
//     });

//     const result = await existingSurvey.save();
//     let data = { result, schools: [] }; // Since we are not creating a new SurveyLocation, schools array is empty
//     return data;
//   }

//   // If the surveyId does not exist, create a new SurveyLocation
//   const schools = await School.find({ udise_sch_code: { $in: locationsArray.map((location) => location.udise_sch_code) } });
//   const uniqueCodes = new Set();
//   const surveyLocation = {
//     ...surveyDetails,
//     surveyLocations: [],
//   };

//   // Check for duplicates and add unique entries
//   locationsArray.forEach(async (location) => {
//     if (!uniqueCodes.has(location.udise_sch_code)) {
//       uniqueCodes.add(location.udise_sch_code);

//       const matchingSchool = schools.find((school) => school.udise_sch_code === location.udise_sch_code);
//       const schoolData = matchingSchool ? await School.findById(matchingSchool._id) : null;
//       surveyLocation.surveyLocations.push({
//         ...location,
//         school: schoolData || null,
//       });
//     }
//   });

//   const newSurveyLocation = await SurveyLocation.create(surveyLocation);
//   let data = { result: newSurveyLocation, schools };
//   return data;
// };

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

module.exports = {
  bulkUpload,
  getAllSurveyLocatins,
  getSchoolDataBySurveyId,
};
