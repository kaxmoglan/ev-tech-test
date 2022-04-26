import { prismaMock } from '../../test/singleton';
import { Prisma } from '@prisma/client';
import { checkIsUniqueConstraint } from './checkPrismaErrors';

describe(`#checkPrismaErrors`, () => {
	test(`checkIsUniqueConstraint returns true if err is Prisma Err P2002`, async () => {
		const err = new Prisma.PrismaClientKnownRequestError(
			`UNIQUE_CONSTRAINT`,
			`P2002`,
			`1`
		);

		expect(checkIsUniqueConstraint(err)).toEqual(true);
	});

	test(`checkIsUniqueConstraint returns true if err is Prisma Err P2002`, async () => {
		const err = new Error(`SOME_ERROR`);

		expect(checkIsUniqueConstraint(err)).toEqual(false);
	});
});
