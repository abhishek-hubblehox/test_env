const csv = require('csv-parser');
const fs = require('fs');
const { CoordinatorAssignment, User } = require('../models');
// const { userService } = require('../services');

// /**
//  * Create a CoordinatorAssignment in bulk
//  * @param {Object} assignmentData
//  * @returns {Promise<CoordinatorAssignment>}
//  */
// const assignCoordinators = async (assignmentData) => {
//   const coordinatorAssignment = new CoordinatorAssignment(assignmentData);
//   const result = await coordinatorAssignment.save();
//   return result;
// };

const bulkUpload = async (file, surveyId, surveyAdmin, emailType) => {
  const validEmailTypes = ['blockCoordinatorEmails', 'districtCoordinatorEmails', 'divisionCoordinatorEmails', 'smeEmails'];
  if (!validEmailTypes.includes(emailType)) {
    throw new Error('Invalid emailType');
  }
  const emails = [];
  fs.createReadStream(file.path)
    .pipe(csv())
    .on('data', (row) => {
      const email = row.email;
      if (email) {
        emails.push(email);
      }
    })
    .on('end', async () => {
      const existingAssignment = await CoordinatorAssignment.findOne({ surveyId });

      if (existingAssignment) {
        existingAssignment[emailType] = existingAssignment[emailType].concat(emails);
        const result = await existingAssignment.save();
        return { result };
      }
      const newAssignment = new CoordinatorAssignment({
        surveyId,
        surveyAdmin,
        [emailType]: emails,
      });
      const result = await newAssignment.save();
      return { result };
    });
};

// const bulkUpload = async (file, surveyId, surveyAdmin, emailType) => {
//   console.log(file);
//   const validEmailTypes = ['blockCoordinatorEmails', 'districtCoordinatorEmails', 'divisionCoordinatorEmails', 'smeEmails'];
//   let role;
//   if (validEmailTypes.includes(emailType)) {
//     if(emailType = 'blockCoordinatorEmails'){
//       return role = 'block'
//     }
//     else if(emailType = 'districtCoordinatorEmails'){
//       return role = 'district'
//     }
//     else if(emailType = 'divisionCoordinatorEmails'){
//       return role = 'division'
//     }
//     else if(emailType = 'smeEmails'){
//       return role = 'SME'
//     }
//     throw new Error('Invalid emailType');
//   }
// console.log(role);
//   const emails = [];
//   const invalidEmails = [];

//   // Read and parse the CSV file
//   await new Promise((resolve, reject) => {
//     fs.createReadStream(file.path)
//       .pipe(csv())
//       .on('data', async (row) => {
//         console.log(row);
//         const email = row.email;
//         if (email) {
//           console.log(email);
//           const { isEmailTaken, isValidRole, userRole } = await userService.checkEmailAndRole(email, role);
//           if (isEmailTaken && isValidRole) {
//             emails.push(email);
//           } else {
//             invalidEmails.push({ email, isValidRole, userRole });
//           }
//         }
//       })
//       .on('end', () => {
//         resolve();
//       })
//       .on('error', (error) => {
//         reject(error);
//       });
//   });

//   if (invalidEmails.length > 0) {
//     // Handle invalid emails
//     return { invalidEmails, validEmails: [], message: 'Invalid emails or incorrect roles' };
//   }

//   const existingAssignment = await CoordinatorAssignment.findOne({ surveyId });

//   if (existingAssignment) {
//     existingAssignment[emailType] = existingAssignment[emailType].concat(emails);
//     const result = await existingAssignment.save();
//     return { validEmails: emails, invalidEmails: [], result, message: 'Successfully updated Coordinator Assignment' };
//   }

//   const newAssignment = new CoordinatorAssignment({
//     surveyId,
//     surveyAdmin,
//     [emailType]: emails,
//   });

//   const result = await newAssignment.save();
//   return { validEmails: emails, invalidEmails: [], result, message: 'Successfully added Coordinator Assignment' };
// };

/**
 * Query for CoordinatorAssignment
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */

const getAllCoordinatorAssignments = async (filter,options) => {
  const assignments = await CoordinatorAssignment.paginate(filter, options);
  return assignments;
};


/**
 * Get CoordinatorAssignment by id
 * @param {ObjectId} id
 * @returns {Promise<CoordinatorAssignment>}
 */
const getAssignById = async (id) => {
  return CoordinatorAssignment.findById(id);
};

/**
 * Get CoordinatorAssignment by id
 * @param {String} surveyId
 * @returns {Promise<CoordinatorAssignment>}
 */
const getAssignBySurveyId = async (surveyId) => {
  return CoordinatorAssignment.find({surveyId});
};

/**
 * Update CoordinatorAssignment by id
 * @param {ObjectId} surveyId
 * @param {Object} updateBody
 * @returns {Promise<CoordinatorAssignment>}
 */
const updateAssignmentIdById = async (surveyId, updateBody) => {
  const assignment = await getAssignById(surveyId);
  if (!assignment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'assignment not found');
  }
  Object.assign(assignment, updateBody);
  await assignment.save();
  return assignment;
};

/**
 * Delete CoordinatorAssignment by id
 * @param {ObjectId} assignmentId
 * @returns {Promise<CoordinatorAssignment>}
 */
const deleteAssignmentById = async (assignmentId) => {
  const assignment = await getAssignById(assignmentId);
  if (!assignment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'assignment not found');
  }
  await assignment.remove();
  return assignment;
};

/**
 * Get users based on email IDs in CoordinatorAssignment arrays
 * @param {string} surveyId - Survey ID
 * @returns {Promise<Array>} - Array of user data matching the email IDs
 */
const getUsersBySurveyId = async (surveyId) => {
  const coordinatorAssignment = await CoordinatorAssignment.findOne({ surveyId });
  if (!coordinatorAssignment) {
    throw new Error('CoordinatorAssignment not found for the given surveyId');
  }

  const emailArrays = [
    'blockCoordinatorEmails',
    'districtCoordinatorEmails',
    'divisionCoordinatorEmails',
    'smeEmails',
  ];

  const users = [];

  for (const emailArray of emailArrays) {
    const emailIds = coordinatorAssignment[emailArray];
    const usersWithEmails = await User.find({ email: { $in: emailIds } });
    users.push({ [emailArray]: usersWithEmails });
  }

  return users;
};

module.exports = {
  bulkUpload,
  getAllCoordinatorAssignments,
  deleteAssignmentById,
  updateAssignmentIdById,
  getAssignById,
  getAssignBySurveyId,
  getUsersBySurveyId,
};
