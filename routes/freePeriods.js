var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();

const User = require('../models/userModel');

// Validation middleware
const validation = require('../middleware/validation');
const validationSchemas = require('../schemas')

module.exports = router;