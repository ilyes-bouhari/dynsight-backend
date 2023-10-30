import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding...');
  console.time(`🌱 Database has been seeded`);

  console.time('🧹 Cleaned up the database...');
  await prisma.building.deleteMany();
  console.timeEnd('🧹 Cleaned up the database...');

  const totalBuildings = 4;
  for (let index = 0; index < totalBuildings; index++) {
    await prisma.building.create({
      data: {
        name: faker.location.street(),
        floors: {
          create: Array.from({
            length: faker.number.int({ min: 1, max: 3 }),
          }).map(() => ({
            name: faker.location.street(),
            rooms: {
              create: Array.from({
                length: faker.number.int({ min: 1, max: 4 }),
              }).map(() => ({
                name: faker.location.street(),
              })),
            },
            zones: {
              create: Array.from({
                length: faker.number.int({ min: 1, max: 3 }),
              }).map(() => ({
                name: faker.location.street(),
              })),
            },
          })),
        },
      },
    });
  }
  const zones = await prisma.zone.findMany();
  for (let zonesIndex = 0; zonesIndex < zones.length; zonesIndex++) {
    const rooms = await prisma.room.findMany({
      take: faker.number.int({ min: 1, max: 2 }),
      where: {
        floorId: zones[zonesIndex].floorId,
        zoneId: null,
      },
    });

    for (let roomsIndex = 0; roomsIndex < rooms.length; roomsIndex++) {
      await prisma.room.update({
        where: { id: rooms[roomsIndex].id },
        data: { zoneId: zones[zonesIndex].id },
      });
    }
  }
  console.timeEnd(`🌱 Database has been seeded`);
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
