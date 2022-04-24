import { getAllClients } from '../database/read';
import type { Request, Response } from 'express';

export async function handleGetAllClients(req: Request, res: Response) {
	const [allClientsErr, allClients] = await getAllClients();

	if (allClientsErr) {
		console.log(`Something went wrong: `, { allClientsErr });
		return void res
			.status(500)
			.send({ success: false, message: `UNKNOWN_ERROR` });
	}

	res.send({ success: true, data: allClients });
}
