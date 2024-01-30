const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { masterProjectController } = require('../../controllers');

const router = express.Router();

router.route('/').post(masterProjectController.createMasterSurveyProject);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Master Survey Project
 *   description: Operations related to Master Survey Projects
 */

// /**
//  * @swagger
//  *  /master-project:
//  *    post:
//  *      summary: Create a Master Survey Project with Sub Surveys
//  *      tags: [Master Survey Project]
//  *      requestBody:
//  *        required: true
//  *        content:
//  *          application/json:
//  *            schema:
//  *              type: object
//  *              properties:
//  *                masterProjectData:
//  *                  type: object
//  *                  description: Data for Master Project
//  *                subSurveyData:
//  *                  type: array
//  *                  items:
//  *                    type: object
//  *                    description: Data for Sub Survey Projects
//  *      responses:
//  *        '201':
//  *          description: Successfully created
//  *        '500':
//  *          description: Internal Server Error
//  */

/**
 * @swagger
 * tags:
 *   name: Master Survey Project
 *   description: API endpoints for Master Survey Project
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     MasterProject:
 *       type: object
 *       properties:
 *         masterProjectName:
 *           type: string
 *           description: Name of the Master Project
 *         masterProjectPurpose:
 *           type: string
 *           description: Purpose of the Master Project
 *         masterProjectStartDate:
 *           type: string
 *           format: date
 *           description: Start date of the Master Project
 *         masterProjectEndDate:
 *           type: string
 *           format: date
 *           description: End date of the Master Project
 *         masterProjectOwnerName:
 *           type: string
 *           description: Name of the owner of the Master Project
 *         masterProjectOwnerEmailId:
 *           type: string
 *           format: email
 *           description: Email ID of the owner of the Master Project
 *         masterProjectOwnerMoNumber:
 *           type: number
 *           description: Mobile number of the owner of the Master Project
 *         auditStartDate:
 *           type: string
 *           format: date
 *           description: Start date of the audit
 *         auditEndDate:
 *           type: string
 *           format: date
 *           description: End date of the audit
 *         approvelStartDate:
 *           type: string
 *           format: date
 *           description: Start date of the approval
 *         approvelEndDate:
 *           type: string
 *           format: date
 *           description: End date of the approval
 *         finalSubmit:
 *           type: boolean
 *           description: Indicates whether the Master Project has been finally submitted
 *         projectStatus:
 *           type: string
 *           enum: ['Not-Started', 'Started', 'In-progress', 'Completed']
 *           description: Status of the Master Project
 *       required:
 *         - masterProjectName
 *         - masterProjectPurpose
 *         - masterProjectStartDate
 *         - masterProjectEndDate
 *         - masterProjectOwnerName
 *         - masterProjectOwnerEmailId
 *         - masterProjectOwnerMoNumber
 *         - auditStartDate
 *         - auditEndDate
 *         - approvelStartDate
 *         - approvelEndDate
 *         - projectStatus
 *
 *     NewSurvey:
 *       type: object
 *       properties:
 *         masterProjectOwnerEmailId:
 *           type: string
 *           format: email
 *           description: Email ID of the owner of the Master Project
 *         masterProjectId:
 *           type: string
 *           description: ID of the Master Project
 *         surveyName:
 *           type: string
 *           description: Name of the Survey
 *         surveyId:
 *           type: string
 *           description: ID of the Survey
 *         surveyPurpose:
 *           type: string
 *           description: Purpose of the Survey
 *         surveyStartDate:
 *           type: string
 *           format: date
 *           description: Start date of the Survey
 *         surveyEndDate:
 *           type: string
 *           format: date
 *           description: End date of the Survey
 *       required:
 *         - masterProjectOwnerEmailId
 *         - masterProjectId
 *         - surveyName
 *         - surveyId
 *         - surveyPurpose
 *         - surveyStartDate
 *         - surveyEndDate
 *
 *   requestBodies:
 *     MasterSurveyRequest:
 *       description: Request body for creating a Master Survey Project with Sub Surveys
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               masterProjectData:
 *                 $ref: '#/components/schemas/MasterProject'
 *               subSurveyData:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/NewSurvey'
 */

/**
 * @swagger
 * paths:
 *   /master-project:
 *     post:
 *       summary: Create a Master Survey Project with Sub Surveys
 *       tags: [Master Survey Project]
 *       requestBody:
 *         $ref: '#/components/requestBodies/MasterSurveyRequest'
 *       responses:
 *         '201':
 *           description: Successfully created
 *           content:
 *             application/json:
 *               example:
 *                 masterProject: {}
 *                 subSurveys: []
 *         '500':
 *           description: Internal Server Error
 */
