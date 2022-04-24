import { Prisma } from '@prisma/client';

export function checkIsUniqueConstraint(err: unknown): boolean {
	if (
		err instanceof Prisma.PrismaClientKnownRequestError &&
		err.code === `P2002`
	) {
		return true;
	}

	return false;
}
