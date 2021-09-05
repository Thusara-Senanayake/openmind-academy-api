//----- modules ------
const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const courseRoutes = require('./routes/courseRoutes');
const mongoose = require('mongoose');
const { handleErrors } = require('./helpers/errorHandler');

const app = express();

//----- configs ------
const port = process.env.PORT || 3001;
dotenv.config();

//----- database ------
mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
		autoIndex: true,
	})
	.then(() => {
		app.listen(port, () => console.log('listening'));
	})
	.catch((err) => {
		console.error(handleErrors('', '', 500, 'server error'));
	});

//----- top m/ws ------
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Method', 'GET, POST, DELETE PUT');
		console.log(1212);
		return res.status(200).json({});
	}

	next();
});

//----- routes ------
app.use('/courses', courseRoutes);
app.use((req, res, next) => {
	const error = new Error('404');
	next(error);
});

//----- redirects ------

//----- error handling ------
app.use((err, req, res, next) => {
	if (err.message === '404') {
		const error = handleErrors('', req.originalUrl, 404, 'invalid request');
		res.status(404).json(error);
	} else {
		const error = handleErrors('', req.originalUrl, 400, 'invalid request');
		res.status(404).json(error);
	}

	next();
});
