const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const multer = require('multer');
const path = require('path');
const { officerController } = require('../../controllers');
const auth = require('../../middlewares/auth');

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
router
  .route('/bulkupload-sme')
  .post(
    auth('surveyadmin', 'district', 'division', 'block', 'SME', 'superadmin'),
    uploads.single('file'),
    officerController.smeOfficerBulkUpload
  );
router
  .route('/bulkupload-block')
  .post(
    auth('surveyadmin', 'district', 'division', 'block', 'SME', 'superadmin'),
    uploads.single('file'),
    officerController.blockOfficerBulkUpload
  );
router
  .route('/bulkupload-district')
  .post(
    auth('surveyadmin', 'district', 'division', 'block', 'SME', 'superadmin'),
    uploads.single('file'),
    officerController.districtOfficerBulkUpload
  );
router
  .route('/bulkupload-division')
  .post(
    auth('surveyadmin', 'district', 'division', 'block', 'SME', 'superadmin'),
    uploads.single('file'),
    officerController.divisinOfficerBulkUpload
  );
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
