const { CoordinatorAssignment } = require('../models');

/**
 * Create a CoordinatorAssignment in bulk
 * @param {Object} assignmentData
 * @returns {Promise<CoordinatorAssignment>}
 */
const assignCoordinators = async (assignmentData) => {
  const coordinatorAssignment = new CoordinatorAssignment(assignmentData);
  const result = await coordinatorAssignment.save();
  return result;
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
  assignCoordinators,
  getAllCoordinatorAssignments,
  deleteAssignmentById,
  updateAssignmentIdById,
  getAssignById,
};
