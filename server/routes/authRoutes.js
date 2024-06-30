const express = require('express')
const AuthController = require('../controllers/authController')

const router = express.Router();

router.post('/register', (req, res) => AuthController.registerUser(req, res))
router.post('/login', (req, res) => AuthController.loginUser(req, res))

module.exports = router;