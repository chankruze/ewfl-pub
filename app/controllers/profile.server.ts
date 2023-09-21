import { prisma } from "~/lib/db.server";

export const getProfileByUserId = async (userId: string) => {
  try {
    return await prisma.userProfile.findUnique({
      where: {
        userId,
      },
    });
  } catch (e) {
    console.error(e);
    return null;
  }
};
