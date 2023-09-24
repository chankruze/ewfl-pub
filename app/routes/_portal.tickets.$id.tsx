import { getAuth } from "@clerk/remix/ssr.server";
import { Prisma } from "@prisma/client";
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
    const ticket = await prisma.ticket.findUnique({
      where: {
        id: args.params.id,
      },
    });

    if (ticket) return json({ ticket });

    return redirect("..");
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.meta) {
        throw new Response(e.meta?.message as string, {
          status: 400,
        });
      } else {
        throw new Response(e.message, {
          status: 400,
        });
      }
    }

    throw new Response("error", {
      status: 500,
    });
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
      <div className="p-4 grid place-items-center space-y-3">
        <Frown className="w-24 h-24 text-red-500" />
        <h1 className="text-3xl font-bold">
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
        <p>{error.message}</p>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
