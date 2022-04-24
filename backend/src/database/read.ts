import prisma from './init';

import type { Clients } from '@prisma/client';
import type { Error } from './init';

/**
 * Finds all clients.
 *
 * @returns [Error, Client[]]
 */
export async function getAllClients(): Promise<
	[undefined | Error, undefined | Clients[]]
> {
	try {
		const result = await prisma.clients.findMany();

		return [undefined, result];
	} catch (err: unknown) {
		return [err as Error, undefined];
	}
}
