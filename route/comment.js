const express = require('express');
const route = express.Router();
const commentController = require('../controller/comment')

route.post('/create', commentController.create)

module.exports = route;