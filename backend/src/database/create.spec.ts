import { prismaMock } from '../../test/singleton';
import { addNewClient } from './create';

describe(`#DatabaseCreate`, () => {
	test(`addNewClient returns undefined error on success`, async () => {
		const email = `test@email.com`;
		const firstName = `Joe`;
		const lastName = `Blogs`;
		const company = `Apple`;

		prismaMock.clients.create.calledWith({
			data: { email, firstName, lastName, company },
		});

		await expect(
			addNewClient(email, firstName, lastName, company)
		).resolves.toEqual([undefined]);
	});

	test(`addNewClient returns unique constraint error if user already exists`, async () => {
		const email = `test@email.com`;
		const firstName = `Joe`;
		const lastName = `Blogs`;
		const company = `Apple`;

		prismaMock.clients.create.mockRejectedValue(new Error('UNIQUE_CONSTRAINT'));

		await expect(
			addNewClient(email, firstName, lastName, company)
		).resolves.toEqual([Error(`UNIQUE_CONSTRAINT`)]);
	});

	test(`addNewClient returns error if Prisma throws error`, async () => {
		const email = `test@email.com`;
		const firstName = `Joe`;
		const lastName = `Blogs`;
		const company = `Apple`;

		prismaMock.clients.create.mockRejectedValue(new Error());

		await expect(
			addNewClient(email, firstName, lastName, company)
		).resolves.toEqual([new Error()]);
	});
});
