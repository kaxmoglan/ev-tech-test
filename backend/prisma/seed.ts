import { PrismaClient } from '@prisma/client';
import testUsers from './test_users.json';

const prisma = new PrismaClient();

async function main() {
	console.log(`Seeding database...`);

	testUsers.forEach(async (user) => {
		await prisma.clients.upsert({
			where: { email: user.email },
			update: {},
			create: {
				email: user.email,
				firstName: user.firstName,
				lastName: user.lastName,
				company: user.company,
			},
		});
	});

	console.log(`Seeding database completed.`);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
