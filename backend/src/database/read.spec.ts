import { prismaMock } from '../../test/singleton';
import { getAllClients } from './read';
import type { Clients } from '@prisma/client';

describe(`#DatabaseRead`, () => {
	test(`getAllClients returns undefined error and Clients[] on success`, async () => {
		const mockClientArr: Clients[] = [
			{
				clientId: `1234`,
				company: `Apple`,
				dateTimeCreated: new Date(),
				email: `tim@apple.com`,
				firstName: `Tim`,
				lastName: `Apple`,
			},
		];
		prismaMock.clients.findMany.mockResolvedValue(mockClientArr);

		await expect(getAllClients()).resolves.toEqual([undefined, mockClientArr]);
	});

	test(`getAllClients returns error and undefined Clients[] on error`, async () => {
		prismaMock.clients.findMany.mockRejectedValue(`ERROR`);

		await expect(getAllClients()).resolves.toEqual([`ERROR`, undefined]);
	});
});
