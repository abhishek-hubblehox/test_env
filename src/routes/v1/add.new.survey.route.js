const express = require('express');
const validate = require('../../middlewares/validate');
const { NewSurveyController } = require('../../controllers');
const { newSurveyValidation } = require('../../validations');

const router = express.Router();

router
  .route('/')
  .post(validate(newSurveyValidation.createNewSurvey), NewSurveyController.createNewSurvey)
  .get(validate(newSurveyValidation.queryNewSurvey), NewSurveyController.queryNewSurvey);

router
  .route('/:newSurveyId')
  .get(validate(newSurveyValidation.getNewSurvey), NewSurveyController.getNewSurvey)
  .patch(validate(newSurveyValidation.updateNewSurvey), NewSurveyController.updateNewSurvey)
  .delete(validate(newSurveyValidation.deleteNewSurvey), NewSurveyController.deleteNewSurvey);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: NewSurvey
 *   description: NewSurvey management
 */

/**
 * @swagger
 * /newsurvey:
 *   post:
 *     summary: Create a NewSurvey
 *     tags: [NewSurvey]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - surveyName
 *               - surveyId
 *               - surveyPurpose
 *               - surveyStartDate
 *               - surveyEndDate
 *               - surveyOwnerName
 *               - surveyOwnerEmailId
 *               - surveyOwnerMoNumber
 *             properties:
 *               surveyName:
 *                 type: string
 *               surveyId:
 *                 type: string
 *               surveyPurpose:
 *                 type: string
 *               surveyStartDate:
 *                 type: string
 *                 format: date
 *               surveyEndDate:
 *                 type: string
 *                 format: date
 *               surveyOwnerName:
 *                 type: string
 *               surveyOwnerEmailId:
 *                 type: string
 *               surveyOwnerMoNumber:
 *                 type: number
 *             example:
 *               surveyName: Vending Machine Installation
 *               surveyId: VMI333
 *               surveyPurpose: multiple installation of vending machine in schools
 *               surveyStartDate: 2024-01-01
 *               surveyEndDate: 2024-01-31
 *               surveyOwnerName: John Doe
 *               surveyOwnerEmailId: john@example.com
 *               surveyOwnerMoNumber: 1234567890
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Board'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get query NewSurvey
 *     tags: [NewSurvey]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: surveyName
 *         schema:
 *           type: string
 *         description: Survey name
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of users
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Board'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /newsurvey/{newSurveyId}:
 *   get:
 *     summary: Get a board
 *     tags: [NewSurvey]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: newSurveyId
 *         required: true
 *         schema:
 *           type: string
 *         description: boardId
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/NewSurvey'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a NewSurvey
 *     tags: [NewSurvey]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: newSurveyId
 *         required: true
 *         schema:
 *           type: string
 *         description: newSurveyId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               surveyName:
 *                 type: string
 *               surveyId:
 *                 type: string
 *               surveyPurpose:
 *                 type: string
 *               surveyStartDate:
 *                 type: string
 *                 format: date
 *               surveyEndDate:
 *                 type: string
 *                 format: date
 *               surveyOwnerName:
 *                 type: string
 *               surveyOwnerEmailId:
 *                 type: string
 *               surveyOwnerMoNumber:
 *                 type: number
 *             example:
 *               surveyName: Updated CBSC
 *               surveyId: ABC123
 *               surveyPurpose: Academic
 *               surveyStartDate: 2024-01-01
 *               surveyEndDate: 2024-01-31
 *               surveyOwnerName: John Doe
 *               surveyOwnerEmailId: john@example.com
 *               surveyOwnerMoNumber: 1234567890
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/NewSurvey'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a NewSurvey
 *     tags: [NewSurvey]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: newSurveyId
 *         required: true
 *         schema:
 *           type: string
 *         description: newSurveyId
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