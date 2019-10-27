const mongoose = require('mongoose');

var schoolSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	periods: {
		type: Number,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('school', schoolSchema);