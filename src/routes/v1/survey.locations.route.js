const express = require('express');
const multer = require('multer');
const path = require('path');
const validate = require('../../middlewares/validate');
const { surveyLocationsController } = require('../../controllers');
const { surveyLocationValidation } = require('../../validations');

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
  .route('/bulk-upload')
  .post(
    uploads.single('file'),
    validate(surveyLocationValidation.bulkUploadValidationSchema),
    surveyLocationsController.bulkUploadFile
  );
router
  .route('/')
  .get(validate(surveyLocationValidation.getAllSurveyLocatins), surveyLocationsController.getAllSurveyLocatins);

module.exports = router;
/**
 * @swagger
 * tags:
 *   name: SurveyLocation
 *   description: SurveyLocation management
 */

/**
 * @swagger
 * /surveylocation/bulk-upload:
 *   post:
 *     summary: Upload a CSV file for bulk survey location upload
 *     tags: [SurveyLocation]
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
 *               surveyConductBy:
 *                 type: string
 *               surveyRequireAudit:
 *                 type: boolean
 *               surveyAuditBy:
 *                 type: string
 *               surveyRequireApproval:
 *                 type: boolean
 *               surveyApprovedBy:
 *                 type: string
 *             required:
 *               - file
 *               - surveyName
 *               - surveyId
 *               - surveyPurpose
 *               - surveyStartDate
 *               - surveyEndDate
 *               - surveyOwnerName
 *               - surveyOwnerEmailId
 *               - surveyOwnerMoNumber
 *               - surveyConductBy
 *               - surveyRequireAudit
 *               - surveyAuditBy
 *               - surveyRequireApproval
 *               - surveyApprovedBy
 *             example:
 *               file: (binary data)
 *               surveyName: Vending Machine Installation
 *               surveyId: VEN879
 *               surveyPurpose: Multiple installation of vending machines in schools
 *               surveyStartDate: 2024-01-01
 *               surveyEndDate: 2024-01-31
 *               surveyOwnerName: John Doe
 *               surveyOwnerEmailId: john@example.com
 *               surveyOwnerMoNumber: 1234567890
 *               surveyConductBy: Block co-ordinator
 *               surveyRequireAudit: true, false
 *               surveyAuditBy: SME
 *               surveyRequireApproval: true, false
 *               surveyApprovedBy: District co-ordinator
 *     responses:
 *       201:
 *         description: Successfully added CSV file
 *         content:
 *           application/json:
 *             example:
 *               message: Successfully added CSV file
 *               data:
 *                 surveyName: Vending Machine Installation
 *                 surveyId: VEN879
 *                 surveyPurpose: Multiple installation of vending machines in schools
 *                 surveyStartDate: 2024-01-01
 *                 surveyEndDate: 2024-01-31
 *                 surveyOwnerName: John Doe
 *                 surveyOwnerEmailId: john@example.com
 *                 surveyOwnerMoNumber: 1234567890
 *                 surveyConductBy: Block co-ordinator, District co-ordinator
 *                 surveyRequireAudit: true
 *                 surveyAuditBy: SME
 *                 surveyRequireApproval: true
 *                 surveyApprovedBy: District co-ordinator
 *                 surveyLocations: [
 *                   {
 *                     udise_sch_code: 2133312,
 *                     surveyor_Email_Id: "surveyor@example.com",
 *                     SME_Email_Id: "sme@example.com",
 *                     approver_Email_Id: "approver@example.com"
 *                   },
 *                   {
 *                     udise_sch_code: 2133312,
 *                     surveyor_Email_Id: "surveyor2@example.com",
 *                     SME_Email_Id: "sme2@example.com",
 *                     approver_Email_Id: "approver2@example.com"
 *                   }
 *                 ]
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

/**
 * @swagger
 * /surveylocation:
 *   get:
 *     summary: Get all surveylocation
 *     description: Only admins can retrieve all surveylocation.
 *     tags: [SurveyLocation]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: surveyId
 *         schema:
 *           type: string
 *         description: surveyId
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of SurveyLocation
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
 *                     $ref: '#/components/schemas/SurveyLocation'
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
