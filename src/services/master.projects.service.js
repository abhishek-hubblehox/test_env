const httpStatus = require('http-status');
const { NewSurvey, MasterProject } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Master Survey Project with Sub Surveys
 * @param {Object} masterProjectData - Data for Master Project
 * @param {Array} subSurveyData - Data for Sub Survey Projects
 * @returns {Promise<{ masterProject: MasterProject, subSurveys: NewSurvey[] }>}
 */
const createMasterSurveyProject = async (masterProjectData, subSurveyData) => {
  const masterProject = await MasterProject.create(masterProjectData);
  const subSurveys = subSurveyData.map((subSurvey) => {
    const newSubSurvey = new NewSurvey({
      ...subSurvey,
      masterProjectId: masterProject.masterProjectId,
      masterProjectOwnerEmailId: masterProject.masterProjectOwnerEmailId,
    });
    return newSubSurvey.save();
  });

  const createdSubSurveys = await Promise.all(subSurveys);
  console.log(masterProject);
  return { masterProject, subSurveys: createdSubSurveys };
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
const queryMasterSurvey = async (filter, options) => {
  const masterProjects = await MasterProject.paginate(filter, options);
  return masterProjects;
};

/**
 * Get MasterProject by id
 * @param {ObjectId} id
 * @returns {Promise<MasterProject>}
 */
const getMasterProjectById = async (id) => {
  return MasterProject.findById(id);
};

/**
 * Update MasterProject by id
 * @param {ObjectId} masterProjectId
 * @param {Object} updateBody
 * @returns {Promise<MasterProject>}
 */
const updateMasterProjectById = async (masterProjectId, updateBody) => {
  const masterProject = await getMasterProjectById(masterProjectId);
  if (!masterProject) {
    throw new ApiError(httpStatus.NOT_FOUND, 'MasterProject not found');
  }
  Object.assign(masterProject, updateBody);
  await masterProject.save();
  return masterProject;
};

/**
 * Delete MasterProject by id
 * @param {ObjectId} masterProjectId
 * @returns {Promise<MasterProject>}
 */
const deleteMasterProjectById = async (masterProjectId) => {
  const masterProject = await getMasterProjectById(masterProjectId);
  if (!masterProject) {
    throw new ApiError(httpStatus.NOT_FOUND, 'MasterProject not found');
  }
  await masterProject.remove();
  return masterProject;
};

/**
 * Get MasterProject by filter
 * @param {ObjectId} masterProjectOwnerEmailId
 * @returns {Promise<MasterProject>}
 */

const getMasterProjectByEmail = async (masterProjectOwnerEmailId) => {
  return MasterProject.find({ masterProjectOwnerEmailId, finalSubmit: true });
};

module.exports = {
  createMasterSurveyProject,
  queryMasterSurvey,
  getMasterProjectById,
  updateMasterProjectById,
  updateMasterProjectById,
  deleteMasterProjectById,
  getMasterProjectByEmail,
};
