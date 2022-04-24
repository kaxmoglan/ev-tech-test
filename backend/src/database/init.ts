import { PrismaClient } from '@prisma/client';

const Prisma = new PrismaClient();

export interface Error {
	name: string;
	message: string;
	stack?: string;
}

export default Prisma;
