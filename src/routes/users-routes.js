const express = require('express');
const router = express.Router();
const authController = require('../controllers/authentication-controller');
const usersController = require('../controllers/users-controller');

// admin actions
router.get('/', authController.verifyJWT, authController.onlyAdmin, usersController.listUsers);
router.put('/insert', authController.verifyJWT, authController.onlyAdmin, usersController.createUser);
router.delete('/delete', authController.verifyJWT, authController.onlyAdmin, usersController.deleteUser);

// any auth user actions
router.put('/update', authController.verifyJWT, usersController.updateUser);
router.get('/viewProfile', authController.verifyJWT, usersController.viewProfile);

module.exports = router;