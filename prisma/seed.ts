import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Seeder function to make local development easier.
 * @returns {Promise<void>}
 */
async function main() {
  // Insert seeding script here
  return Promise.resolve();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
