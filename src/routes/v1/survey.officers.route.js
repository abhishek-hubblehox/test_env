const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const multer = require('multer');
const path = require('path');
const validate = require('../../middlewares/validate');
const { coordinatorAssignmentController } = require('../../controllers');
const { coordinatorsValidation } = require('../../validations');
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
  .route('/')
  .post(validate(coordinatorsValidation.assignCoordinatorsValidation), coordinatorAssignmentController.assignCoordinators);

router
  .route('/')
  .get(validate(coordinatorsValidation.getAllCoordinators), coordinatorAssignmentController.getAllCoordinatorAssignments);
router
  .route('/:assignmentId')
  .get(validate(coordinatorsValidation.getAssignment), coordinatorAssignmentController.getAssigment)
  .delete(validate(coordinatorsValidation.deleteAssignment), coordinatorAssignmentController.deleteAssigment);
router
  .route('/filter/:surveyId')
  .get(validate(coordinatorsValidation.getAssignmentBySurveyId), coordinatorAssignmentController.getAssigmentBySurveyId);
router
  .route('/assign/bulk-upload')
  .post(
    uploads.single('file'),
    validate(coordinatorsValidation.bulkUploadValidationSchema),
    coordinatorAssignmentController.bulkUploadFile
  );
module.exports = router;

// /**
//  * @swagger
//  * /assign-coordinators:
//  *   post:
//  *     summary: Assign coordinators for a survey
//  *     tags: [CoordinatorAssignment]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               surveyId:
//  *                 type: string
//  *               surveyAdmin:
//  *                 type: string
//  *               blockCoordinatorEmails:
//  *                 type: array
//  *                 items:
//  *                   type: string
//  *                   format: email
//  *               districtCoordinatorEmails:
//  *                 type: array
//  *                 items:
//  *                   type: string
//  *                   format: email
//  *               divisionCoordinatorEmails:
//  *                 type: array
//  *                 items:
//  *                   type: string
//  *                   format: email
//  *               smeEmails:
//  *                 type: array
//  *                 items:
//  *                   type: string
//  *                   format: email
//  *     responses:
//  *       201:
//  *         description: Coordinators assigned successfully
//  *         content:
//  *           application/json:
//  *             example:
//  *               message: Coordinators assigned successfully
//  *               data: {}
//  *       400:
//  *         description: Validation error
//  *         content:
//  *           application/json:
//  *             example:
//  *               message: Validation error
//  *               errors: [{ field1: 'Error 1' }, { field2: 'Error 2' }]
//  *       500:
//  *         description: Internal Server Error
//  *         content:
//  *           application/json:
//  *             example:
//  *               message: Internal Server Error
//  */

/**
 * @swagger
 * /assign-coordinators:
 *   get:
 *     summary: Get all coordinator assignments
 *     tags: [CoordinatorAssignment]
 *     responses:
 *       200:
 *         description: Successfully retrieved coordinator assignments
 *         content:
 *           application/json:
 *             example:
 *               message: Coordinator assignments retrieved successfully
 *               data: [{}]
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal Server Error
 */

/**
 * @swagger
 * /assign-coordinators/{assignmentId}:
 *   get:
 *     summary: Get a CoordinatorAssignment
 *     tags: [CoordinatorAssignment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: assignmentId
 *         required: true
 *         schema:
 *           type: string
 *         description: assignmentId
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Division'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a CoordinatorAssignment
 *     tags: [CoordinatorAssignment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: assignmentId
 *         required: true
 *         schema:
 *           type: string
 *         description: assignmentId
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /assign-coordinators/filter/{surveyId}:
 *   get:
 *     summary: Update coordinator assignment by surveyId
 *     tags: [CoordinatorAssignment]
 *     parameters:
 *       - in: path
 *         name: surveyId
 *         required: true
 *         description: surveyId of the coordinator assignment
 *     responses:
 *       200:
 *         description: Successfully updated coordinator assignment
 *         content:
 *           application/json:
 *             example:
 *               message: Coordinator assignment updated successfully
 *               data: {}
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               message: Validation Error
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             example:
 *               message: Coordinator assignment not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal Server Error
 */

/**
 * @swagger
 * /assign-coordinators/assign/bulk-upload:
 *   post:
 *     summary: Upload a CSV file for bulk coordinator assignment
 *     tags: [CoordinatorAssignment]
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
 *               surveyId:
 *                 type: string
 *               surveyAdmin:
 *                 type: string
 *               emailType:
 *                 type: string
 *                 enum: ['blockCoordinatorEmails', 'districtCoordinatorEmails', 'divisionCoordinatorEmails', 'smeEmails']
 *             required:
 *               - file
 *               - surveyId
 *               - surveyAdmin
 *               - emailType
 *             example:
 *               file: (binary data)
 *               surveyId: VEN879
 *               surveyAdmin: 65aa570cfe881bb4c26edbb7
 *               emailType: blockCoordinatorEmails
 *     responses:
 *       201:
 *         description: Successfully added CSV file
 *         content:
 *           application/json:
 *             example:
 *               message: Successfully added Coordinator Assignment
 *               result: { updated/created assignment object }
 *       400:
 *         description: Uploaded file must be in CSV format.
 *         content:
 *           application/json:
 *             example:
 *               message: Uploaded file must be in CSV format.
 *       404:
 *         description: Missing file
 *         content:
 *           application/json:
 *             example:
 *               message: Missing file
 */
