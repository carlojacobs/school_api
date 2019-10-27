var express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var router = express.Router();

// Import user model
const User = require('../models/userModel');

// Validation middleware
const validation = require('../middleware/validation');
const validationSchemas = require('../schemas')

// JWT verification middleware
const verifyToken = require('../middleware/verifyToken');

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});


/* GET ALL USERS */
router.get('/all', async (req, res, next) => {
	try {
		const users = await User.find();
		res.send(users);
	} catch(err) {
		res.status(400).send(err);
	}
});

/* USER LOGIN */
router.post('/login', validation(validationSchemas.login), async (req, res, next) => {
	var { email, password } = req.body;

	// Check if user already exists
	const user = await User.findOne({email});
	if (!user) {
		res.status(400).send("Incorrect email or password");
	}
	const validPass = await bcrypt.compare(password, user.password);
	if (!validPass) {
		res.status(400).send("Incorrect email or password");
	} else {
		const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
		res.header('auth-token', token).send(token);
	}
});

/* USER REGISTER */
router.post('/register', validation(validationSchemas.register), async (req, res, next) => {
	// Get post data
	var { name, email, password } = req.body;

	// Check if user already exists
	const emailExists = await User.findOne({email});
	if (emailExists) {
		res.status(400).send("A user with this email already exists");
	}

	// Hash the password
	const salt = await bcrypt.genSalt(10);
	const hashPass = await bcrypt.hash(password, salt);

	const user = new User({
		name,
		email,
		password: hashPass
	});
	try {
		const savedUser = await user.save();
		const token = jwt.sign({id: savedUser._id}, process.env.JWT_SECRET);
		res.header('auth-token', token).send(token);
	} catch(err) {
		res.status(400).send(err);
	}
});

router.get('/test', verifyToken, (req, res, next) => {
	res.send(req.user);
});

module.exports = router;