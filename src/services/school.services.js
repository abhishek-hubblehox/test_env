const csv = require('csvtojson');
const { School } = require('../models');

const bulkUpload = async (schoolArray, csvFilePath = null) => {
  try {
    let modifiedSchoolArray = schoolArray;
    if (csvFilePath) {
      modifiedSchoolArray = csvFilePath;
    }
    const batchSize = 1000; 
    if (!modifiedSchoolArray || !modifiedSchoolArray.length) {
      throw new Error('Missing array');
    }
    const jsonArray = await csv().fromFile(modifiedSchoolArray);

    // Split the array into batches
    for (let i = 0; i < jsonArray.length; i += batchSize) {
      const batch = jsonArray.slice(i, i + batchSize);

      // Use bulk write for efficient insertion
      await School.bulkWrite(
        batch.map((doc) => ({
          insertOne: {
            document: doc,
          },
        }))
      );
    }

    console.log('Data insertion completed.');
    mongoose.disconnect(); // Disconnect after processing

    // const promises = modifiedSchoolArray.map(async (school) => {
    //   try {
    //     const schoolFound = await School.findOne({
    //       udise_sch_code: school.udise_sch_code,
    //     });

    //     if (schoolFound) {
    //       return { duplicate: true, data: school };
    //     }

    //     let data = new School(school);
    //     // eslint-disable-next-line no-unused-vars
    //     data = await data.save();

    //     return { duplicate: false, data: school };
    //   } catch (error) {
    //     // Handle errors within the map function
    //     return { error: true, data: school, errorMessage: error.message };
    //   }
    // });

    // const results = await Promise.all(promises);

    // const duplicates = {
    //   totalDuplicates: results.filter((result) => result.duplicate).length,
    //   data: results.filter((result) => result.duplicate),
    // };

    // const nonDuplicates = {
    //   totalNonDuplicates: results.filter((result) => !result.duplicate).length,
    //   data: results.filter((result) => !result.duplicate),
    // };

    // const errors = results.filter((result) => result.error);
    // if (errors.length > 0) {
    //   throw new Error(`Some schools failed to process: ${JSON.stringify(errors)}`);
    // }

    // return {
    //   duplicates,
    //   nonDuplicates,
    // };
  } catch (error) {
    // Handle any other errors
    throw new Error(`Bulk upload failed: ${error.message}`);
  }
};

// const csv = require('csvtojson');

// const fs = require('fs');
//
// // const csv = require('csv-parser');

// const bulkUpload = async (schoolArray, csvFilePath = null) => {
//   try {
//     let modifiedSchoolArray = schoolArray;

//     if (csvFilePath) {
//       const csvData = await new Promise((resolve, reject) => {
//         const data = [];
//         fs.createReadStream(csvFilePath)
//           .pipe(csv())
//           .on('data', (record) => {
//             data.push(record);
//           })
//           .on('end', () => {
//             resolve(data);
//           })
//           .on('error', (error) => {
//             reject(error);
//           });
//       });

//       modifiedSchoolArray = csvData;
//     }

//     if (!modifiedSchoolArray || !modifiedSchoolArray.length) {
//       throw new Error('Missing or invalid array');
//     }

//     // Use insertMany to insert all schools directly into the database
//     const insertedSchools = await School.insertMany(modifiedSchoolArray);

//     return {
//       success: true,
//       message: 'Bulk upload successful.',
//     };
//   } catch (error) {
//     // Handle any errors
//     throw new Error(`Bulk upload failed: ${error.message}`);
//   }
// };

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
