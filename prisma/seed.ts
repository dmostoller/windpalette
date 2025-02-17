import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Clean up existing data
  await prisma.themeSave.deleteMany({});
  await prisma.themeColor.deleteMany({});
  await prisma.gradient.deleteMany({});
  await prisma.theme.deleteMany({});
  await prisma.user.deleteMany({});

  // Create test users
  const user1 = await prisma.user.create({
    data: {
      email: "test@example.com",
      name: "Test User",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "demo@example.com",
      name: "Demo User",
    },
  });

  // Create sample themes
  const theme1 = await prisma.theme.create({
    data: {
      name: "Ocean Breeze",
      visibleColors: 3,
      published: true,
      authorId: user1.id,
      saveCount: 5,
      colors: {
        create: [
          { name: "primary", value: "#0EA5E9" },
          { name: "secondary", value: "#38BDF8" },
          { name: "accent", value: "#0369A1" },
        ],
      },
      gradients: {
        create: [
          { color: "#0EA5E9", active: true },
          { color: "#38BDF8", active: true },
          { color: "#0369A1", active: true },
        ],
      },
    },
  });

  const theme2 = await prisma.theme.create({
    data: {
      name: "Forest Night",
      visibleColors: 3,
      published: true,
      authorId: user2.id,
      saveCount: 3,
      colors: {
        create: [
          { name: "primary", value: "#166534" },
          { name: "secondary", value: "#15803D" },
          { name: "accent", value: "#14532D" },
        ],
      },
      gradients: {
        create: [
          { color: "#166534", active: true },
          { color: "#15803D", active: true },
          { color: "#14532D", active: true },
        ],
      },
    },
  });

  // Create some theme saves
  await prisma.themeSave.create({
    data: {
      themeId: theme1.id,
      userId: user2.id,
    },
  });

  await prisma.themeSave.create({
    data: {
      themeId: theme2.id,
      userId: user1.id,
    },
  });

  console.log("Database has been seeded with test data! 🌱");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
