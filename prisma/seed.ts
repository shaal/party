import 'tsconfig-paths/register';
import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

async function main() {
	console.log('Place your seed code here...');
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await db.$disconnect();
	});
