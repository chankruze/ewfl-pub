import { getAuth } from "@clerk/remix/ssr.server";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { SITE_TITLE } from "~/consts";
import { getProfileByUserId } from "~/controllers/profile.server";
import { BottomNavList } from "./bottom-nav-list";
import { NavList } from "./nav-list";
import { UserProfileBox } from "./user-profile-box";

export const loader = async (args: LoaderFunctionArgs) => {
  const { userId } = await getAuth(args);

  if (!userId) {
    return redirect("/sign-in");
  }

  const profile = await getProfileByUserId(userId);

  return json({ profile });
};

export default function PanelLayout() {
  const { profile } = useLoaderData<typeof loader>();

  if (!profile) return null;

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
        {/* <DialogProvider /> */}
        <Outlet />
        {/* <div className="flex w-full h-full items-center justify-center">
          <div className="font-outfit text-6xl font-medium">
            <Outlet />
          </div>
        </div> */}
      </main>
      {/* mobile bottom navbar */}
      <nav className="bg-primary text-primary-foreground sm:hidden">
        <BottomNavList />
      </nav>
    </div>
  );
}
