import { getAuth } from "@clerk/remix/ssr.server";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "~/lib/db.server";
import { TicketCard } from "./ticket-card";

export const loader = async (args: LoaderFunctionArgs) => {
  const { userId } = await getAuth(args);

  if (!userId) return redirect("/sign-in");

  try {
    // fetch all tickets of user
    const tickets = await prisma.recyleTicket.findMany({
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

export default function RecyclePageLayout() {
  const { tickets } = useLoaderData<typeof loader>();

  return (
    <div className="p-4 grid lg:grid-cols-3 place-items-center">
      {tickets.map((t) => (
        <TicketCard key={t.id} data={t} />
      ))}
    </div>
  );
}
