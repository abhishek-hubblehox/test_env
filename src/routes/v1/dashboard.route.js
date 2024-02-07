const express = require('express');
const validate = require('../../middlewares/validate');
const router = express.Router();
const { dashboardController } = require('../../controllers');
const { dashboardValidation } = require('../../validations');

router
  .route('/count/:masterProjectId/:surveyId/:surveyFormId')
  .get(validate(dashboardValidation.getCounts), dashboardController.getLocationCounts);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Dashboard management
 */

/**
 * @swagger
 * /dashboard/count/{masterProjectId}/{surveyId}/{surveyFormId}:
 *   get:
 *     summary: Get counts of locations, surveyed locations, and pending locations based on masterProjectId,surveyFormId,surveyProjectId
 *     tags: [Dashboard]
 *     parameters:
 *       - in: path
 *         name: masterProjectId
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         name: surveyId
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         name: surveyFormId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Counts retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalLocations:
 *                   type: number
 *                 totalSurveyed:
 *                   type: number
 *                 totalPending:
 *                   type: number
 *       500:
 *         description: Internal Server Error
 */
