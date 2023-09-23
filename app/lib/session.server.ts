import { getAuth } from "@clerk/remix/ssr.server";
import { redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { getProfileByUserId } from "~/controllers/profile.server";

export async function getCurrentUserProfile(args: LoaderFunctionArgs) {
  const { userId } = await getAuth(args);

  if (userId) {
    const _profile = await getProfileByUserId(userId);
    return _profile;
  }

  redirect(process.env.CLERK_SIGN_IN_URL as string);
}
