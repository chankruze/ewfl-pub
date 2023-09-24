import type { Facility } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { generateEmailFromFacId, generateFacId } from "~/lib/facility.server";

const prisma = new PrismaClient();

const task = async (facility: {
  name: string;
  location: Facility["location"];
  address: string;
  manager: {
    name: string;
    email: string;
    password: string;
  };
}) => {
  try {
    const { name, location, address } = facility;
    const facId = generateFacId();
    const email = generateEmailFromFacId(facId, "fac", "ewfl.gov.in");
    const managerEmail = generateEmailFromFacId(
      facId,
      "manager",
      "ewfl.gov.in"
    );
    const managerName = `Manager ${facId.charAt(0)}${facId
      .toLocaleLowerCase()
      .slice(1)}`;

    const result = await prisma.facility.create({
      data: {
        name,
        email,
        facId,
        location,
        address,
        image: `https://api.dicebear.com/7.x/bottts/svg?seed=${facId}`,
        facilityUsers: {
          create: {
            name: managerName,
            email: managerEmail,
            role: "MANAGER",
            password: {
              create: {
                hash: await bcrypt.hash("Manager@123", 12),
              },
            },
          },
        },
      },
    });
    console.info(result);
  } catch (error) {
    console.error(error);
  }
};

const facilities = [
  {
    location: { coordinates: [85.76446, 20.275] },
    address: "893 Clove Lane",
    name: "Mockingbird",
  },
  {
    location: { coordinates: [85.76664, 20.27326] },
    address: "55 Spenser Terrace",
    name: "Fulton",
  },
  {
    location: { coordinates: [85.78072, 20.27545] },
    address: "90051 Erie Road",
    name: "Vermont",
  },
  {
    location: { coordinates: [85.7738, 20.26467] },
    address: "1 Thompson Street",
    name: "Bunker Hill",
  },
  {
    location: { coordinates: [85.77945, 20.26671] },
    address: "1221 Clarendon Lane",
    name: "Sutherland",
  },
  {
    location: { coordinates: [85.78161, 20.26822] },
    address: "522 Basil Way",
    name: "Old Gate",
  },
  {
    location: { coordinates: [85.75605, 20.26908] },
    address: "95 Linden Avenue",
    name: "Briar Crest",
  },
  {
    location: { coordinates: [85.79555, 20.27309] },
    address: "093 Susan Court",
    name: "Lillian",
  },
  {
    location: { coordinates: [85.77466, 20.27363] },
    address: "78 Pennsylvania Way",
    name: "Saint Paul",
  },
  {
    location: { coordinates: [85.78156, 20.26389] },
    address: "363 Miller Street",
    name: "Hanson",
  },
];

Promise.all(facilities.map((f) => task(f)))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
