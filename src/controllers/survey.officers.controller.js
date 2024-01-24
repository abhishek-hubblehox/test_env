const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { coordinatorAssignmentServices } = require('../services');

const assignCoordinators = catchAsync(async (req, res) => {
  const result = await coordinatorAssignmentServices.assignCoordinators(req.body);
  res.status(httpStatus.CREATED).send(result);
});

const getAllCoordinatorAssignments = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['surveyId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const assignments = await coordinatorAssignmentServices.getAllCoordinatorAssignments(filter, options);
  res.status(httpStatus.OK).send(assignments);
});

const getAssigment = catchAsync(async (req, res) => {
  const assignment = await coordinatorAssignmentServices.getAssignById(req.params.assignmentId);
  if (!assignment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Assignment found');
  }
  res.send(assignment);
});

const updateAssigment= catchAsync(async (req, res) => {
  const assignment = await coordinatorAssignmentServices.updateAssignmentIdById(req.params.surveyId, req.body);
  res.send(assignment);
});

const deleteAssigment = catchAsync(async (req, res) => {
  await coordinatorAssignmentServices.deleteAssignmentById(req.params.assignmentId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  assignCoordinators,
  getAllCoordinatorAssignments,
  getAssigment,
  updateAssigment,
  deleteAssigment,
};
