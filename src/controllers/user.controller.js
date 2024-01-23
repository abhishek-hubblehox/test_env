const httpStatus = require('http-status');
const { join } = require('path');
const csv = require('csvtojson');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

// const staticFolder = join(__dirname, '../../');
// const uploadsFolder = join(staticFolder, 'uploads/');

// const uploadsFolder = join(__dirname, '../../uploads');

const bulkUploadFile = catchAsync(async (req, res) => {
  if (req.file) {
    // console.log(req.file)
    const csvFilePath = join(req.file.path);
    const csvJsonArray = await csv().fromFile(csvFilePath);
    // console.log(csvJsonArray)
    const user = await userService.bulkUploadUsers(null, csvJsonArray);
    res.status(httpStatus.CREATED).send(user);
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, 'Missing file');
  }
});

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const checkUser = catchAsync(async (req, res) => {
  const user = await userService.getUserByEmail(req.body.email);
  if (!user) {
    res.send({});
  } else {
    res.send(user);
  }
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  bulkUploadFile,
  createUser,
  getUsers,
  checkUser,
  getUser,
  updateUser,
  deleteUser,
};
