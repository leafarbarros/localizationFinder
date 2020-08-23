const express = require('express');
const router = express.Router();
const authenticationController = require('../controllers/authentication-controller');

router.post('/login', authenticationController.login);
router.post('/logout', authenticationController.verifyJWT, authenticationController.logout);

module.exports = router;