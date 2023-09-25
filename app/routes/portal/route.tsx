import { getAuth } from "@clerk/remix/ssr.server";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { getOnboardingProfile } from "~/lib/initial-profile";
import { InitialProfileModal } from "~/modals/initial-profile-modal";
import { ModalProvider } from "~/providers/modal-provider";
import { BottomNavList } from "./bottom-nav-list";
import logo from "./logo.png";
import { NavList } from "./nav-list";
import { UserProfileBox } from "./user-profile-box";

export const loader = async (args: LoaderFunctionArgs) => {
  const { userId } = await getAuth(args);

  if (!userId) return redirect(process.env.CLERK_SIGN_IN_URL as string);

  // automatically create a profile for now
  const profile = await getOnboardingProfile(userId);

  // facts api
  const response = await fetch(
    "https://my.api.mockaroo.com/electro_facts.json?key=cf5ee360"
  );

  // get all facts
  // const facts = await response.json();
  // pick a random fact
  // const fact = facts[Math.ceil(Math.random() * facts.length)];

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
      <aside className="hidden flex-col gap-2 bg-primary text-primary-foreground sm:flex sm:w-1/3 lg:w-1/6">
        {/* brand */}
        {/* <h1 className="bg-yellow-400/10 p-4 lg:p-6 text-center font-montserrat font-bold uppercase text-yellow-400 text-xl sm:text-2xl lg:text-4xl">
          {SIDE_NAV_TITLE}
        </h1> */}
        <Link to="/">
          <img src={logo} alt="Brand" className="p-2 bg-yellow-200" />
        </Link>
        {/* nav links */}
        <nav className="p-4 flex-1">
          <NavList />
        </nav>
        {/* <div className="p-4">
          <KnowledgePopup data={fact.fact} />
        </div> */}
        {/* user details */}
        <div className="p-4">
          <UserProfileBox
            profile={{
              id: profile.id,
              name: profile.name,
              email: profile.email,
              avatar: profile.avatar,
            }}
          />
        </div>
      </aside>
      {/* outlet */}
      <main className="flex-1 overflow-y-auto scrollbar-thin">
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
