const express = require('express');
const controller = require('./user.controller');
const authenticate = require('../../components/oauth/authenticate');

const router = express.Router();

router.get('/me', authenticate(), controller.me);

module.exports = router;
