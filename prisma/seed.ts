import { PrismaClient } from "../apps/web/src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  await prisma.service.upsert({
    where: { slug: "consultation" },
    update: {},
    create: {
      name: "Consultation",
      slug: "consultation",
      description: "Service de demonstration pour le module booking.",
      durationMin: 60,
      priceCents: 12500,
    },
  });
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
