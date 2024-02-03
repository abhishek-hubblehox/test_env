const httpStatus = require('http-status');
const { join } = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const csv = require('csvtojson');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { schoolService } = require('../services');
const ApiError = require('../utils/ApiError');

const staticFolder = join(__dirname, '../');
const uploadsFolder = join(staticFolder, 'uploads');

// const bulkUploadFile = catchAsync(async (req, res) => {
//   if (req.file) {
//     if (req.file.mimetype !== 'text/csv') {
//       throw new ApiError(httpStatus.BAD_REQUEST, 'Uploaded file must be in CSV format.');
//     }
//     const csvFilePath = join(uploadsFolder, req.file.filename);
//     const csvJsonArray = await csv().fromFile(csvFilePath);
//     const result = await schoolService.bulkUpload(csvJsonArray);
//     res.send(result);
//   } else {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Missing file');
//   }
// });

// controller
// const bulkUploadFile = catchAsync(async (req, res) => {
//   try {
//     if (req.file) {
//       if (req.file.mimetype !== 'text/csv') {
//         throw new ApiError(httpStatus.BAD_REQUEST, 'Uploaded file must be in CSV format.');
//       }
//       const csvFilePath = join(uploadsFolder, req.file.filename);
//       const csvJsonArray = await csv().fromFile(csvFilePath);
//       await schoolService.bulkUpload(null, csvJsonArray);
//       res.status(httpStatus.CREATED).send({ message: 'Data uploaded successfully.' });
//       res.end();
//     } else {
//       throw new ApiError(httpStatus.NOT_FOUND, 'Missing file');
//     }
//   } catch (error) {
//     res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: error.message });
//     res.end();
//   }
// });

// controller.js
const bulkUploadFile = catchAsync(async (req, res) => {
  try {
    if (req.file) {
      if (req.file.mimetype !== 'text/csv') {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Uploaded file must be in CSV format.');
      }
      const csvFilePath = join(uploadsFolder, req.file.filename);
      await schoolService.bulkUpload(null, csvFilePath);
      res.status(httpStatus.CREATED).send({ message: 'Data uploaded successfully.' });
    } else {
      throw new ApiError(httpStatus.NOT_FOUND, 'Missing file');
    }
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: error.message });
  }
});

const getAllSchools = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['school_name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await schoolService.getAllSchools(filter, options);
  res.send(result);
});
module.exports = {
  getAllSchools,
  bulkUploadFile,
};
