import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.gradient.deleteMany({});
  await prisma.themeColor.deleteMany({});
  await prisma.theme.deleteMany({});
  await prisma.user.deleteMany({});

  // Create test user
  const user = await prisma.user.create({
    data: {
      email: "test@example.com",
      name: "Test User",
    },
  });

  // Create sample themes
  const oceanBreeze = await prisma.theme.create({
    data: {
      name: "Ocean Breeze",
      visibleColors: 3,
      published: true,
      authorId: user.id,
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
    include: {
      colors: true,
      gradients: true,
    },
  });

  const forestNight = await prisma.theme.create({
    data: {
      name: "Forest Night",
      visibleColors: 3,
      published: true,
      authorId: user.id,
      colors: {
        create: [
          { name: "primary", value: "#166534" },
          { name: "secondary", value: "#22C55E" },
          { name: "accent", value: "#14532D" },
        ],
      },
      gradients: {
        create: [
          { color: "#166534", active: true },
          { color: "#22C55E", active: true },
          { color: "#14532D", active: true },
        ],
      },
    },
    include: {
      colors: true,
      gradients: true,
    },
  });

  console.log({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    themes: [
      {
        id: oceanBreeze.id,
        name: oceanBreeze.name,
        colors: oceanBreeze.colors,
        gradients: oceanBreeze.gradients,
      },
      {
        id: forestNight.id,
        name: forestNight.name,
        colors: forestNight.colors,
        gradients: forestNight.gradients,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
