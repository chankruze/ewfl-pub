import { UserButton, useAuth } from "@clerk/remix";
import { getAuth } from "@clerk/remix/ssr.server";
import {
  redirect,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { SITE_DESCRIPTION, SITE_TITLE } from "~/consts";

export const meta: MetaFunction = () => {
  return [
    { title: SITE_TITLE },
    { name: "description", content: SITE_DESCRIPTION },
  ];
};

export const loader = async (args: LoaderFunctionArgs) => {
  const { userId } = await getAuth(args);
  if (!userId) {
    return redirect("/sign-in");
  }
  return {};
};

export default function Index() {
  const { isLoaded, userId, sessionId } = useAuth();

  // In case the user signs out while on the page.
  if (!isLoaded || !userId) {
    return null;
  }

  return (
    <main className="p-4">
      <div>
        Hello, {userId} your current active session is {sessionId}
      </div>
      <UserButton afterSignOutUrl="/" />
    </main>
  );
}
