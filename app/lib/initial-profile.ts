import { createClerkClient } from "@clerk/remix/api.server";
import { prisma } from "~/lib/db.server";
import { generateReferralCode } from "./referral.server";

export const getOnboardingProfile = async (userId: string) => {
  // check if the user has a profile,
  // if not create a profile
  const profile = await prisma.userProfile.findUnique({
    where: {
      userId,
    },
  });

  if (!profile) {
    const user = await createClerkClient({
      secretKey: process.env.CLERK_SECRET_KEY,
    }).users.getUser(userId);

    const profile = await prisma.userProfile.create({
      data: {
        userId: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: `${user.firstName} ${user.lastName}`,
        avatar: user.hasImage
          ? user.imageUrl
          : `https://api.dicebear.com/7.x/thumbs/svg?seed=${user.id}`,
        referralCode: generateReferralCode(),
        wallet: {
          create: {},
        },
      },
    });

    return profile;
  }

  return profile;
};
