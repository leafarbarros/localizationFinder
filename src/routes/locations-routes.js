const express = require('express');
const router = express.Router();
const authController = require('../controllers/authentication-controller');
const locationController = require('../controllers/locations-controller');

router.get('/list', authController.verifyJWT, locationController.listLocations);
router.post('/insert', authController.verifyJWT, locationController.createLocation);
router.post('/map', authController.verifyJWT, locationController.mapLocations);
router.post('/addLocationFeedback', authController.verifyJWT, locationController.addLocationFeedback);
router.post('/viewLocationFeedbacks', authController.verifyJWT, locationController.viewLocationFeedbacks);

module.exports = router;