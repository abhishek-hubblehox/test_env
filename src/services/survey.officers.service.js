const csv = require('csv-parser');
const fs = require('fs');
const { CoordinatorAssignment } = require('../models');

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
        return { result, message: 'Successfully updated Coordinator Assignment' };
      }
      const newAssignment = new CoordinatorAssignment({
        surveyId,
        surveyAdmin,
        [emailType]: emails,
      });
      const result = await newAssignment.save();
      return { result, message: 'Successfully added Coordinator Assignment' };
    });
};

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

module.exports = {
  bulkUpload,
  getAllCoordinatorAssignments,
  deleteAssignmentById,
  updateAssignmentIdById,
  getAssignById,
};
