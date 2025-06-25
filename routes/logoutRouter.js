const express = require('express');
const logoutRouter = express.Router();
const logoutController = require('../controllers/logoutController');
const path = require('path');

logoutRouter.get('/', logoutController.handleLogout);

module.exports = logoutRouter;