const express = require('express');
const router = express.Router();

const UsersController = require('./users.controller');

// FullPATH: /api/v1/users/...

router.get('/', UsersController.getAllUsers);

router.get('/:id', UsersController.getUser);

module.exports = router;
