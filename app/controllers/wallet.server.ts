import { prisma } from "~/lib/db.server";

export const getWalletByUserId = async (userId: string) => {
  const _profile = await prisma.userProfile.findUnique({
    where: {
      userId,
    },
    select: {
      wallet: true,
    },
  });

  if (_profile) return _profile.wallet;

  return null;
};
