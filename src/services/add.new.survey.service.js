const httpStatus = require('http-status');
const { NewSurvey } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a NewSurvey
 * @param {Object} NewSurveyBody
 * @returns {Promise<NewSurvey>}
 */
const createNewSurvey = async (NewSurveyBody) => {
  return NewSurvey.create(NewSurveyBody);
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
const queryNewSurvey = async (filter, options) => {
  const newSurveys = await NewSurvey.paginate(filter, options);
  return newSurveys;
};

/**
 * Get NewSurvey by id
 * @param {ObjectId} id
 * @returns {Promise<NewSurvey>}
 */
const getNewSurveyById = async (id) => {
  return NewSurvey.findById(id);
};

/**
 * Update NewSurvey by id
 * @param {ObjectId} newSurveyId
 * @param {Object} updateBody
 * @returns {Promise<NewSurvey>}
 */
const updateNewSurveyById = async (newSurveyId, updateBody) => {
  const newSurvey = await getNewSurveyById(newSurveyId);
  if (!newSurvey) {
    throw new ApiError(httpStatus.NOT_FOUND, 'NewSurvey not found');
  }
  Object.assign(newSurvey, updateBody);
  await newSurvey.save();
  return newSurvey;
};

/**
 * Delete NewSurvey by id
 * @param {ObjectId} newSurveyId
 * @returns {Promise<NewSurvey>}
 */
const deleteNewSurveyById = async (newSurveyId) => {
  const newSurvey = await getNewSurveyById(newSurveyId);
  if (!newSurvey) {
    throw new ApiError(httpStatus.NOT_FOUND, 'NewSurvey not found');
  }
  await newSurvey.remove();
  return newSurvey;
};

/**
 * Get book by filter
 * @param {ObjectId} surveyOwnerEmailId
 * @returns {Promise<NewSurvey>}
 */

const getSurveyByEmailAndProjectId = async (masterProjectOwnerEmailId,masterProjectId) => {
  return NewSurvey.find({ masterProjectOwnerEmailId,masterProjectId });
};

module.exports = {
  createNewSurvey,
  queryNewSurvey,
  getNewSurveyById,
  updateNewSurveyById,
  deleteNewSurveyById,
  getSurveyByEmailAndProjectId,
};
