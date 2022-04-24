import prisma from './init';
import { checkIsUniqueConstraint } from './checkPrismaErrors';

import type { Error } from './init';

/**
 * Adds new client.
 *
 * @returns [Error]
 */
export async function addNewClient(
	email: string,
	firstName: string,
	lastName: string,
	company: string
): Promise<[undefined | Error]> {
	try {
		await prisma.clients.create({
			data: {
				email,
				firstName,
				lastName,
				company,
			},
		});

		return [undefined];
	} catch (err: unknown) {
		const isUniqueConstraint = checkIsUniqueConstraint(err);
		if (isUniqueConstraint) {
			return [{ name: `UNIQUE_CONSTRAINT`, message: `Email already exists` }];
		}

		return [err as Error];
	}
}
