import { getAuth } from "@clerk/remix/ssr.server";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { SITE_TITLE } from "~/consts";
import { getOnboardingProfile } from "~/lib/initial-profile";
import { InitialProfileModal } from "~/modals/initial-profile-modal";
import { ModalProvider } from "~/providers/modal-provider";
import { BottomNavList } from "./bottom-nav-list";
import { NavList } from "./nav-list";
import { UserProfileBox } from "./user-profile-box";

export const loader = async (args: LoaderFunctionArgs) => {
  const { userId } = await getAuth(args);

  if (!userId) return redirect(process.env.CLERK_SIGN_IN_URL as string);

  // automatically create a profile for now
  const profile = await getOnboardingProfile(userId);

  return json({ profile });
};

export const action = async (args: ActionFunctionArgs) => {};

export default function PanelLayout() {
  const { profile } = useLoaderData<typeof loader>();

  // TODO: implement initial create profile modal if new-user
  if (!profile) return <InitialProfileModal />;

  return (
    <div className="flex h-full w-full flex-col overflow-hidden sm:flex-row">
      {/* sidebar */}
      <aside className="hidden flex-col gap-6 bg-primary p-4 text-primary-foreground sm:flex lg:w-1/6">
        {/* brand */}
        <h1 className="py-6 text-center font-montserrat font-semibold uppercase text-yellow-400 lg:text-3xl">
          {SITE_TITLE}
        </h1>
        {/* nav links */}
        <nav className="flex-1">
          <NavList />
        </nav>
        {/* user details */}
        <UserProfileBox
          profile={{
            id: profile.id,
            name: profile.name,
            email: profile.email,
            avatar: profile.avatar,
          }}
        />
      </aside>
      {/* outlet */}
      <main className="flex-1 overflow-y-auto">
        <ModalProvider />
        <Outlet />
      </main>
      {/* mobile bottom navbar */}
      <nav className="bg-primary text-primary-foreground sm:hidden">
        <BottomNavList />
      </nav>
    </div>
  );
}
