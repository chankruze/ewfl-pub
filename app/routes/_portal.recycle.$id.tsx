import { getAuth } from "@clerk/remix/ssr.server";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
    isRouteErrorResponse,
    useLoaderData,
    useRouteError,
} from "@remix-run/react";
import { Frown } from "lucide-react";
import { prisma } from "~/lib/db.server";

export const loader = async (args: LoaderFunctionArgs) => {
  const { userId } = await getAuth(args);

  if (!userId) return redirect("/sign-in");

  try {
    const ticket = await prisma.recyleTicket.findUnique({
      where: {
        id: args.params.id,
      },
    });

    return json({ ticket });
  } catch (error) {
    console.error(error);
    return json({ ticket: null });
  }
};

export default function RecycleTicketPageLayout() {
  const { ticket } = useLoaderData<typeof loader>();

  return (
    <div className="p-4">
      <pre>{JSON.stringify(ticket, null, 2)}</pre>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} - {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div className="p-4 grid place-items-center space-y-3">
        <Frown className="w-24 h-24 text-red-500" />
        <h1 className="text-3xl font-bold">Something went wrong</h1>
        <p className="text-sm">{error.message}</p>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
