const csv = require('csvtojson');
const { BlockOfficer, DistrictOfficer, DivisionOfficer, User, SMEOfficer } = require('../models');

/**
 * Create a Master Survey Project with Sub Surveys
 * @param {Object} masterProjectData - Data for Master Project
 * @param {Array} subSurveyData - Data for Sub Survey Projects
 * @returns {Promise<{ masterProject: MasterProject, subSurveys: NewSurvey[] }>}
 */
const smeOfficerBulkUpload = async (csvFilePath, surveyAdmin, masterProjectId) => {
  const smeOfficers = await csv().fromFile(csvFilePath);

  if (!smeOfficers || !smeOfficers.length) {
    throw new Error('No valid SME Officers found in the CSV file');
  }

  const results = await Promise.all(
    smeOfficers.map(async (smeOfficer) => {
      try {
        const smeOfficerFound = await SMEOfficer.findOne({
          email: smeOfficer.email,
          masterProjectId,
        });

        // Check if the email exists in the User model
        const userFound = await User.findOne({
          email: smeOfficer.email,
          role: 'SME',
        });

        if (smeOfficerFound || !userFound) {
          // Email is either in SMEOfficer or User collection
          return { duplicate: true, data: smeOfficer };
        }

        // Email is not in both SMEOfficer and User collections
        const data = await new SMEOfficer({ ...smeOfficer, surveyAdmin, masterProjectId }).save();
        return { duplicate: false, data };
      } catch (error) {
        return { error: true, data: smeOfficer, errorMessage: error.message };
      }
    })
  );

  const duplicates = {
    totalDuplicates: results.filter((result) => result.duplicate).length,
    data: results.filter((result) => result.duplicate),
  };

  const nonDuplicates = {
    totalNonDuplicates: results.filter((result) => !result.duplicate).length,
    data: results.filter((result) => !result.duplicate),
  };

  const errors = results.filter((result) => result.error);
  if (errors.length > 0) {
    throw new Error(`Some SME Officers failed to process: ${JSON.stringify(errors)}`);
  }

  return { duplicates, nonDuplicates };
};

/**
 * Create a Master Survey Project with Sub Surveys
 * @param {Object} masterProjectData - Data for Master Project
 * @param {Array} subSurveyData - Data for Sub Survey Projects
 * @returns {Promise<{ masterProject: MasterProject, subSurveys: NewSurvey[] }>}
 */
const blockOfficerBulkUpload = async (csvFilePath, surveyAdmin, masterProjectId) => {
  const smeOfficers = await csv().fromFile(csvFilePath);

  if (!smeOfficers || !smeOfficers.length) {
    throw new Error('No valid SME Officers found in the CSV file');
  }

  const results = await Promise.all(
    smeOfficers.map(async (smeOfficer) => {
      try {
        const smeOfficerFound = await BlockOfficer.findOne({
          email: smeOfficer.email,
          masterProjectId,
        });

        // Check if the email exists in the User model
        const userFound = await User.findOne({
          email: smeOfficer.email,
          role: 'block',
        });

        if (smeOfficerFound || !userFound) {
          return { duplicate: true, data: smeOfficer };
        }

        const data = await new BlockOfficer({ ...smeOfficer, surveyAdmin, masterProjectId }).save();

        return { duplicate: false, data };
      } catch (error) {
        return { error: true, data: smeOfficer, errorMessage: error.message };
      }
    })
  );

  const duplicates = {
    totalDuplicates: results.filter((result) => result.duplicate).length,
    data: results.filter((result) => result.duplicate),
  };

  const nonDuplicates = {
    totalNonDuplicates: results.filter((result) => !result.duplicate).length,
    data: results.filter((result) => !result.duplicate),
  };

  const errors = results.filter((result) => result.error);
  if (errors.length > 0) {
    throw new Error(`Some SME Officers failed to process: ${JSON.stringify(errors)}`);
  }

  return { duplicates, nonDuplicates };
};

/**
 * Create a Master Survey Project with Sub Surveys
 * @param {Object} masterProjectData - Data for Master Project
 * @param {Array} subSurveyData - Data for Sub Survey Projects
 * @returns {Promise<{ masterProject: MasterProject, subSurveys: NewSurvey[] }>}
 */
const districtOfficerBulkUpload = async (csvFilePath, surveyAdmin, masterProjectId) => {
  const smeOfficers = await csv().fromFile(csvFilePath);

  if (!smeOfficers || !smeOfficers.length) {
    throw new Error('No valid SME Officers found in the CSV file');
  }

  const results = await Promise.all(
    smeOfficers.map(async (smeOfficer) => {
      try {
        const smeOfficerFound = await DistrictOfficer.findOne({
          email: smeOfficer.email,
          masterProjectId,
        });

        // Check if the email exists in the User model
        const userFound = await User.findOne({
          email: smeOfficer.email,
          role: 'district',
        });

        if (smeOfficerFound || !userFound) {
          return { duplicate: true, data: smeOfficer };
        }

        const data = await new DistrictOfficer({ ...smeOfficer, surveyAdmin, masterProjectId }).save();

        return { duplicate: false, data };
      } catch (error) {
        return { error: true, data: smeOfficer, errorMessage: error.message };
      }
    })
  );

  const duplicates = {
    totalDuplicates: results.filter((result) => result.duplicate).length,
    data: results.filter((result) => result.duplicate),
  };

  const nonDuplicates = {
    totalNonDuplicates: results.filter((result) => !result.duplicate).length,
    data: results.filter((result) => !result.duplicate),
  };

  const errors = results.filter((result) => result.error);
  if (errors.length > 0) {
    throw new Error(`Some SME Officers failed to process: ${JSON.stringify(errors)}`);
  }

  return { duplicates, nonDuplicates };
};

/**
 * Create a Master Survey Project with Sub Surveys
 * @param {Object} masterProjectData - Data for Master Project
 * @param {Array} subSurveyData - Data for Sub Survey Projects
 * @returns {Promise<{ masterProject: MasterProject, subSurveys: NewSurvey[] }>}
 */
const divisinOfficerBulkUpload = async (csvFilePath, surveyAdmin, masterProjectId) => {
  const smeOfficers = await csv().fromFile(csvFilePath);

  if (!smeOfficers || !smeOfficers.length) {
    throw new Error('No valid SME Officers found in the CSV file');
  }

  const results = await Promise.all(
    smeOfficers.map(async (smeOfficer) => {
      try {
        const smeOfficerFound = await DivisionOfficer.findOne({
          email: smeOfficer.email,
          masterProjectId,
        });

        // Check if the email exists in the User model
        const userFound = await User.findOne({
          email: smeOfficer.email,
          role: 'division',
        });

        if (smeOfficerFound || !userFound) {
          return { duplicate: true, data: smeOfficer };
        }

        const data = await new DivisionOfficer({ ...smeOfficer, surveyAdmin, masterProjectId }).save();

        return { duplicate: false, data };
      } catch (error) {
        return { error: true, data: smeOfficer, errorMessage: error.message };
      }
    })
  );

  const duplicates = {
    totalDuplicates: results.filter((result) => result.duplicate).length,
    data: results.filter((result) => result.duplicate),
  };

  const nonDuplicates = {
    totalNonDuplicates: results.filter((result) => !result.duplicate).length,
    data: results.filter((result) => !result.duplicate),
  };

  const errors = results.filter((result) => result.error);
  if (errors.length > 0) {
    throw new Error(`Some SME Officers failed to process: ${JSON.stringify(errors)}`);
  }

  return { duplicates, nonDuplicates };
};
module.exports = {
  smeOfficerBulkUpload,
  blockOfficerBulkUpload,
  districtOfficerBulkUpload,
  divisinOfficerBulkUpload,
};
