import { getAuth } from "@clerk/remix/ssr.server";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { SITE_DESCRIPTION, SITE_TITLE } from "~/consts";
import { prisma } from "~/lib/db.server";
import { NoTickets } from "./no-tickets";
import { TicketCard } from "./ticket-card";

export const meta: MetaFunction = () => {
  return [
    { title: `Tickets / ${SITE_TITLE}` },
    {
      property: "og:title",
      content: `Tickets / ${SITE_TITLE}`,
    },
    { name: "description", content: SITE_DESCRIPTION },
  ];
};

export const loader = async (args: LoaderFunctionArgs) => {
  const { userId } = await getAuth(args);

  if (!userId) return redirect("/sign-in");

  try {
    // fetch all tickets of user
    const tickets = await prisma.ticket.findMany({
      where: {
        userProfile: {
          userId,
        },
      },
    });

    return json({ tickets });
  } catch (error) {
    console.error(error);
    return json({ tickets: [] });
  }
};

export default function TicketsIndexPage() {
  const { tickets } = useLoaderData<typeof loader>();

  if (!tickets.length)
    return (
      <div className="p-6 grid place-items-center">
        <NoTickets />
      </div>
    );

  return (
    <div className="p-4 sm:p-6 grid lg:grid-cols-3 place-items-center gap-4">
      {tickets.map((t) => (
        <TicketCard key={t.id} data={t} />
      ))}
    </div>
  );
}
