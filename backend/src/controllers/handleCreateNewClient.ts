import { addNewClient } from '../database/create';
import type { Request, Response } from 'express';

export async function handleCreateNewClient(req: Request, res: Response) {
	const email = req.body.email?.trim();
	const firstName = req.body.firstName?.trim();
	const lastName = req.body.lastName?.trim();
	const company = req.body.company?.trim();

	if (!email) {
		return void res
			.status(400)
			.send({ success: false, message: `MISSING_PARAM_EMAIL` });
	}

	if (!firstName) {
		return void res
			.status(400)
			.send({ success: false, message: `MISSING_PARAM_FIRST_NAME` });
	}

	if (!lastName) {
		return void res
			.status(400)
			.send({ success: false, message: `MISSING_PARAM_LAST_NAME` });
	}

	if (!company) {
		return void res
			.status(400)
			.send({ success: false, message: `MISSING_PARAM_COMPANY` });
	}

	const [addNewClientErr] = await addNewClient(
		email,
		firstName,
		lastName,
		company
	);

	if (addNewClientErr && addNewClientErr.name === `UNIQUE_CONSTRAINT`) {
		console.log(`Add user error: `, { addNewClientErr });
		return void res
			.status(400)
			.send({ success: false, message: `USER_ALREADY_EXISTS` });
	}

	if (addNewClientErr) {
		console.log(`Something went wrong: `, { addNewClientErr });
		return void res
			.status(500)
			.send({ success: false, message: `UNKNOWN_ERROR` });
	}

	res.send({ success: true, message: `NEW_CLIENT_CREATED` });
}
