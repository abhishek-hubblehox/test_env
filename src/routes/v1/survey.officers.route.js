const express = require('express');
const validate = require('../../middlewares/validate');
const { coordinatorAssignmentController } = require('../../controllers');
const { coordinatorsValidation } = require('../../validations');
const router = express.Router();

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
  .route('/:surveyId')
  .patch(validate(coordinatorsValidation.updateAssignment), coordinatorAssignmentController.updateAssigment);

module.exports = router;

/**
 * @swagger
 * /assign-coordinators:
 *   post:
 *     summary: Assign coordinators for a survey
 *     tags: [CoordinatorAssignment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               surveyId:
 *                 type: string
 *               surveyAdmin:
 *                 type: string
 *               blockCoordinatorEmails:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: email
 *               districtCoordinatorEmails:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: email
 *               divisionCoordinatorEmails:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: email
 *               smeEmails:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: email
 *     responses:
 *       201:
 *         description: Coordinators assigned successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Coordinators assigned successfully
 *               data: {}
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             example:
 *               message: Validation error
 *               errors: [{ field1: 'Error 1' }, { field2: 'Error 2' }]
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal Server Error
 */

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
 * /coordinator-assignments/{surveyId}:
 *   patch:
 *     summary: Update coordinator assignment by surveyId
 *     tags: [CoordinatorAssignment]
 *     parameters:
 *       - in: path
 *         name: surveyId
 *         required: true
 *         description: ID of the coordinator assignment
 *       - in: body
 *         name: body
 *         required: true
 *         description: Data to update in the coordinator assignment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 surveyAdmin:
 *                   type: string
 *                   description: ID of the user serving as the survey administrator
 *                 blockCoordinatorEmails:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Array of block coordinator email addresses
 *                 districtCoordinatorEmails:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Array of district coordinator email addresses
 *                 divisionCoordinatorEmails:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Array of division coordinator email addresses
 *                 smeEmails:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Array of SME email addresses
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
