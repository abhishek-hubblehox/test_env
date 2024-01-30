const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Filter users
 * @param {Object} options
 * @returns {Promise<User>}
 */
const userBulkFilter = (options) => {
  return {
    filter: options.filter || (options.email ? { email: options.email } : {}),
    getFilter() {
      return this.filter;
    },
  };
};

const getUserFilterEmail = async (filter) => {
  const userFilter = userBulkFilter(filter).getFilter();
  if (userFilter) {
    const record = await User.findOne(userFilter).exec();
    return record;
  }
  return { message: 'Missing query params !!!' };
};

/**
 * Create a user in bulk
 * @param {Object} userArray
 * @returns {Promise<User>}
 */

const bulkUploadUsers = async (userArray, csvFilePath = null) => {
  let modifiedUserArray = userArray;
  if (csvFilePath) {
    modifiedUserArray = { users: csvFilePath };
  }
  if (!modifiedUserArray.users || !modifiedUserArray.users.length) return { error: true, message: 'missing array' };

  const records = [];
  const dups = [];

  await Promise.all(
    modifiedUserArray.users.map(async (user) => {
      const studentFound = await getUserFilterEmail({ email: user.email });
      if (studentFound) {
        dups.push(user);
      } else {
        let record = new User(user);
        record = await record.save();
        if (record) {
          records.push(user);
        }
      }
    })
  );

  const duplicates = {
    totalDuplicates: dups.length ? dups.length : 0,
    data: dups.length ? dups : [],
  };
  const nonduplicates = {
    totalNonDuplicates: records.length ? records.length : 0,
    data: records.length ? records : [],
  };
  return { nonduplicates, duplicates };
};

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return User.create(userBody);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email, role: 'surveyadmin' });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  bulkUploadUsers,
};
