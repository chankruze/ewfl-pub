import { getAuth } from "@clerk/remix/ssr.server";
import { Prisma } from "@prisma/client";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Link,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { format } from "date-fns";
import { ExternalLink, Frown } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { SITE_DESCRIPTION, SITE_TITLE } from "~/consts";
import { prisma } from "~/lib/db.server";
import { RewardsAlert } from "./rewards-alert";

export const loader = async (args: LoaderFunctionArgs) => {
  const { userId } = await getAuth(args);

  if (!userId) return redirect("/sign-in");

  try {
    const ticket = await prisma.ticket.findUnique({
      where: {
        id: args.params.id,
      },
      include: {
        facility: {
          select: {
            name: true,
          },
        },
      },
    });

    if (ticket) {
      return json({ ticket });
    }

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

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: `${data?.ticket.title} / ${SITE_TITLE}` },
    {
      property: "og:title",
      content: `${data?.ticket.title} / ${SITE_TITLE}`,
    },
    { name: "description", content: SITE_DESCRIPTION },
  ];
};

export default function RecycleTicketPageLayout() {
  const { ticket } = useLoaderData<typeof loader>();

  return (
    <div className="p-4 grid lg:grid-cols-2 gap-4">
      <div className="space-y-4 p-2 sm:p-4 row-start-2 lg:row-start-1">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <h1 className="text-lg font-semibold text-blue-500">
            {ticket.tktId}
          </h1>
          <div className="flex items-center gap-1">
            <Badge variant="destructive">{ticket.status}</Badge>
            <Badge>
              {format(new Date(ticket.createdAt), "dd MMM yyyy hh:ss a")}
            </Badge>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-xl sm:text-2xl font-bold capitalize">
            {ticket.title}
          </p>
          <p className="font-roboto">{ticket.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <p className="font-medium">Booked facility: </p>
          <Link
            to={`/facilities/${ticket.facilityId}`}
            className="flex items-center gap-1 underline text-yellow-500"
          >
            {ticket.facility.name} <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
        <RewardsAlert />
      </div>
      <div className="space-y-2 p-2 sm:p-4">
        <div className="w-full h-full grid lg:grid-cols-2 bg-red-300">
          <img
            src={ticket.image}
            alt="Damaged product"
            className="lg:col-span-2 w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
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
