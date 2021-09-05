const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
	{
		id: {
			type: String,
			required: [true, 'ID is required.'],
			unique: true,
		},
		name: {
			type: String,
			required: [true, 'Name is required.'],
			unique: true,
		},
		lecturers: {
			type: [String],
			required: [true, 'Lectures are required.'],
		},

		credits: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
