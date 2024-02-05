const csv = require('csvtojson');
const fs = require('fs');
const { School } = require('../models');

const bulkUpload = async (schoolArray, csvFilePath = null) => {
  try {
    let modifiedSchoolArray = schoolArray;

    if (csvFilePath) {
      const csvData = await new Promise((resolve, reject) => {
        const data = [];
        fs.createReadStream(csvFilePath)
          .pipe(csv())
          .on('data', (record) => {
            data.push(record);
          })
          .on('end', () => {
            resolve(data);
          })
          .on('error', (error) => {
            reject(error);
          });
      });

      modifiedSchoolArray = csvData;
    }

    if (!modifiedSchoolArray || !modifiedSchoolArray.length) {
      throw new Error('Missing or invalid array');
    }

    // Use insertMany to insert all schools directly into the database
    const insertedSchools = await School.insertMany(modifiedSchoolArray);

    return {
      success: true,
      message: 'Bulk upload successful.',
    };
  } catch (error) {
    // Handle any errors
    throw new Error(`Bulk upload failed: ${error.message}`);
  }
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
