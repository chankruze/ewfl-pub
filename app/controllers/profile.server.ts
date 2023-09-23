import { prisma } from "~/lib/db.server";

export const getProfileByUserId = async (userId: string) => {
  return await prisma.userProfile.findUnique({
    where: {
      userId,
    },
  });
};
