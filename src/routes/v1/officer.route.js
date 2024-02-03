const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const multer = require('multer');
const path = require('path');
// const validate = require('../../middlewares/validate');
const { officerController } = require('../../controllers');
// const { schoolValidation } = require('../../validations');

const router = express.Router();
const uploadDir = path.join(__dirname, '../../uploads');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploads = multer({ storage });
router.route('/bulkupload-sme').post(uploads.single('file'), officerController.smeOfficerBulkUpload);
// router.route('/').get(validate(schoolValidation.getAllSchools), SchoolController.getAllSchools);
router.route('/bulkupload-block').post(uploads.single('file'), officerController.blockOfficerBulkUpload);
router.route('/bulkupload-district').post(uploads.single('file'), officerController.districtOfficerBulkUpload);
router.route('/bulkupload-division').post(uploads.single('file'), officerController.divisinOfficerBulkUpload);
module.exports = router;
/**
 * @swagger
 * tags:
 *   name: Officer
 *   description: Officer management
 */
/**
 * @swagger
 * /officer/bulkupload-sme:
 *   post:
 *     summary: Upload a CSV file for bulk officer upload
 *     tags: [Officer]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               surveyAdmin:
 *                 type: string
 *               masterProjectId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successfully added CSV file
 *       404:
 *         description: Missing file
 */

/**
 * @swagger
 * /officer/bulkupload-block:
 *   post:
 *     summary: Upload a CSV file for bulk officer upload
 *     tags: [Officer]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               surveyAdmin:
 *                 type: string
 *               masterProjectId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successfully added CSV file
 *       404:
 *         description: Missing file
 */

/**
 * @swagger
 * /officer/bulkupload-district:
 *   post:
 *     summary: Upload a CSV file for bulk officer upload
 *     tags: [Officer]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               surveyAdmin:
 *                 type: string
 *               masterProjectId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successfully added CSV file
 *       404:
 *         description: Missing file
 */

/**
 * @swagger
 * /officer/bulkupload-division:
 *   post:
 *     summary: Upload a CSV file for bulk officer upload
 *     tags: [Officer]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               surveyAdmin:
 *                 type: string
 *               masterProjectId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successfully added CSV file
 *       404:
 *         description: Missing file
 */
