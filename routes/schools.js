var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();

const School = require('../models/schoolModel');

// Admin auth middleware
const adminAuth = require('../middleware/adminAuth');

// Validation middleware
const validation = require('../middleware/validation');
const validationSchemas = require('../schemas')

router.get('/all', async (req, res, next) => {
	const schools = await School.find();
	res.send(schools);
});

router.post('/new', adminAuth, validation(validationSchemas.newSchool), async (req, res, next) => {
	const { name, periods } = req.body;
	const newSchool = new School({
		name,
		periods
	});
	try {
		const savedSchool = await newSchool.save();
		res.send(savedSchool);
	} catch(err) {
		res.status(400).send(err);
	}
});

module.exports = router;