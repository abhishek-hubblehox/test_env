const { School } = require('../models');

const bulkUpload = async (schoolArray, csvFilePath = null) => {
  let modifiedSchoolArray = schoolArray;
  if (csvFilePath) {
    modifiedSchoolArray = csvFilePath;
  }

  if (!modifiedSchoolArray || !modifiedSchoolArray.length) {
    throw new Error('Missing array');
  }

  const promises = modifiedSchoolArray.map(async (school) => {
    const schoolFound = await School.findOne({
      udise_sch_code: school.udise_sch_code,
    });
    if (schoolFound) {
      return { duplicate: true, data: school };
    }

    let data = new School(school);
    // eslint-disable-next-line no-unused-vars
    data = await data.save();

    return { duplicate: false, data: school };
  });
  const results = await Promise.all(promises);

  const duplicates = {
    totalDuplicates: results.filter((result) => result.duplicate).length,
    data: results.filter((result) => result.duplicate),
  };

  const nonDuplicates = {
    totalNonDuplicates: results.filter((result) => !result.duplicate).length,
    data: results.filter((result) => !result.duplicate),
  };

  return {
    duplicates,
    nonDuplicates,
  };
};

/**
 * Query for school
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getAllSchools = async (filter, options) => {
  const schools = await School.paginate(filter, options);
  return schools;
};

module.exports = {
  bulkUpload,
  getAllSchools,
};
