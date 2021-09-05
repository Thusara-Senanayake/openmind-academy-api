const Course = require('../models/Course');
const { handleErrors } = require('../helpers/errorHandler');

const course_index_all = (req, res) => {
	Course.find()
		.select('-_id -createdAt -updatedAt -__v')
		.then((result) => {
			res.json(result);
		})
		.catch(() => {
			const error = handleErrors('', '', 500, 'server error');
			res.status(503).json(error);
		});
};
const course_index_one = (req, res) => {
	const id = req.params.id;
	Course.findOne({ id })
		.select('-_id -createdAt -updatedAt -__v')
		.then((result) => {
			if (result === null) {
				const error = handleErrors('', req.originalUrl, 404, 'invalid request');
				res.status(404).json(error);
			} else {
				res.json(result);
			}
		})
		.catch(() => {
			const error = handleErrors('', '', 500, 'server error');
			res.status(503).json(error);
		});
};
const course_create = (req, res) => {
	const course = {
		id: req.body.id,
		name: req.body.name,
		lecturers: req.body.lecturers,
		credits: req.body.credits,
	};
	Course.create(course, { name: 0 })
		.then((result) => {
			res.json(result);
		})
		.catch((err) => {
			const error = handleErrors(err, req.originalUrl, 400, 'invalid request');
			res.status(400).json(error);
		});
};
const course_delete = (req, res) => {
	const id = req.params.id;
	Course.findOneAndDelete({ id: id })
		.then((result) => {
			if (result === null) {
				const error = handleErrors('', req.originalUrl, 404, 'invalid request');
				res.status(404).send(error);
			} else {
				res.json(result);
			}
		})
		.catch(() => {
			const error = handleErrors('', '', 500, 'server error');
			res.json(error);
		});
};
const course_update = (req, res) => {
	const currentId = req.params.id;
	const { name, lecturers, credits, id } = req.body;
	Course.findOneAndUpdate({ id: currentId }, { id, name, lecturers, credits })
		.then((result) => {
			if (result === null) {
				const error = handleErrors('', req.originalUrl, 404, 'invalid request');
				res.status(404).send(error);
			} else {
				res.json(result);
			}
		})
		.catch((err) => {
			let error;
			err.code === 11000
				? (error = handleErrors(err, req.originalUrl, '', 'invalid request'))
				: (error = handleErrors('', '', 500, 'server error'));
			res.json(error);
		});
};

module.exports = {
	course_index_all,
	course_index_one,
	course_create,
	course_delete,
	course_update,
};
