const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const multer = require('multer');
const path = require('path');
const { officerController } = require('../../controllers');

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
router.route('/bulkupload-block').post(uploads.single('file'), officerController.blockOfficerBulkUpload);
router.route('/bulkupload-district').post(uploads.single('file'), officerController.districtOfficerBulkUpload);
router.route('/bulkupload-division').post(uploads.single('file'), officerController.divisinOfficerBulkUpload);
router.route('/filterby/division/:masterProjectId').get(officerController.getDivisionCoordinatorsDetails);
router.route('/filterby/district/:masterProjectId').get(officerController.getDistrictCoordinatorsDetails);
router.route('/filterby/block/:masterProjectId').get(officerController.getBlockCoordinatorsDetails);
router.route('/filterby/sme/:masterProjectId').get(officerController.getSmeCoordinatorsDetails);

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

/**
 * @swagger
 * /officer/filterby/division/{masterProjectId}:
 *   get:
 *     summary: get list of Officers assigned to a project
 *     tags: [Officer]
  *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: masterProjectId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "201":
 *         description: Data not found
 *         content:
 *           application/json:
 *             example:
 *               message: Data not found
 */

/**
 * @swagger
 * /officer/filterby/district/{masterProjectId}:
 *   get:
 *     summary: get list of Officers assigned to a project
 *     tags: [Officer]
  *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: masterProjectId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "201":
 *         description: Data not found
 *         content:
 *           application/json:
 *             example:
 *               message: Data not found
 */

/**
 * @swagger
 * /officer/filterby/block/{masterProjectId}:
 *   get:
 *     summary: get list of Officers assigned to a project
 *     tags: [Officer]
  *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: masterProjectId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "201":
 *         description: Data not found
 *         content:
 *           application/json:
 *             example:
 *               message: Data not found
 */
/**
 * @swagger
 * /officer/filterby/sme/{masterProjectId}:
 *   get:
 *     summary: get list of Officers assigned to a project
 *     tags: [Officer]
  *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: masterProjectId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "201":
 *         description: Data not found
 *         content:
 *           application/json:
 *             example:
 *               message: Data not found
 */