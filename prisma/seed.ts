import { PrismaClient } from "@prisma/client";
import type { Program } from "@prisma/client";

const prisma = new PrismaClient();

const programs: Program[] = [
  {
    id: "4da3a302-0b49-43ab-82f0-e9b5a2dca170",
    name: "Program 1",
  },
  {
    id: "4ba608ad-8718-4eb1-80c3-7e6013e53c84",
    name: "Program 2",
  },
  {
    id: "32cafd8c-296e-46b3-b318-7b332ea7360f",
    name: "Program 3",
  },
];

const main = async () => {
  console.log("Start seeding ...");

  for (const program of programs) {
    const newProgram = await prisma.program.create({
      data: program,
    });
    console.log(`Created program with id: ${newProgram.id}`);
  }

  console.log("Seeding finished.");
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
