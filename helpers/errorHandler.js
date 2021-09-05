const handleErrors = (err, domain, code, message) => {
	const errorTypes = {
		404: {
			domain: domain || undefined,
			reason: 'ResourceNotFoundException',
			message: 'Not Found',
		},

		11000: [
			{
				domain: 'id',
				reason: 'DuplicateValueException',
				message: `ID already exists`,
			},
			{
				domain: 'name',
				reason: 'DuplicateValueException',
				message: `Name already exists`,
			},
		],
		500: {
			domain: '/',
			reason: 'InternalServerError',
			message: 'Internal server error',
		},
		400: {
			domain: domain || undefined,
			reason: 'BadRequestException',
			message: 'Bad Request',
		},
	};

	const error = {
		error: {
			code: code || 400,
			message: message || 'invalid request',
			errors: [],
		},
	};
	// err is always sent when validation is needed
	// checking for validation errors
	if (err.errors) {
		const errorFields = Object.values(err.errors);
		errorFields.forEach((errorField) => {
			error.error.errors.push({
				domain: errorField.path,
				reason: errorField.name,
				message: errorField.message,
			});
		});
	}
	//checking for duplicate values
	else if (err.code === 11000) {
		// duplicate id
		if (Object.keys(err.keyValue)[0] === 'id') {
			error.error.errors.push(errorTypes[11000][0]);
		}
		//duplicate name
		else if (Object.keys(err.keyValue)[0] === 'name') {
			error.error.errors.push(errorTypes[11000][1]);
		}
	} else {
		error.error.errors.push(errorTypes[code]);
	}

	return error;
};

module.exports = {
	handleErrors,
};
