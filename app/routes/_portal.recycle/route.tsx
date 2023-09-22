import { getAuth } from "@clerk/remix/ssr.server";
import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import type { MetaArgs } from "@remix-run/react";
import { Outlet, useNavigate } from "@remix-run/react";
import { ChevronLeft } from "lucide-react";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import { SITE_TITLE } from "~/consts";
import { createRecycleTicket } from "~/controllers/recycle.server";
import { useModal } from "~/hooks/use-modal-store";
import { LocationWidget } from "./location-widget";

export const meta = (args: MetaArgs) => {
  return [
    { title: `Recycle / ${SITE_TITLE}` },
    {
      property: "og:title",
      content: `Recycle / ${SITE_TITLE}`,
    },
    {
      name: "description",
      content: `See and manage all your recycle tickets here.`,
    },
  ];
};

export const action = async (args: ActionFunctionArgs) => {
  const { userId } = await getAuth(args);

  if (!userId) {
    return redirect("/sign-in");
  }

  const formData = await args.request.formData();
  const __action = formData.get("__action");

  switch (__action) {
    case "create": {
      const _ticket = await createRecycleTicket(formData, userId);

      if (_ticket.id) return json({ ticket: _ticket, ok: true });

      return json({
        ok: false,
        error: _ticket.error,
      });
    }

    default: {
      throw new Error("Unknown action");
    }
  }
};

export default function RecyclePageLayout() {
  const navigate = useNavigate();
  const { onOpen } = useModal();

  const goBack = () => navigate(-1);

  const openTicketModal = () => onOpen("createTicket", {});

  return (
    <div className="flex flex-col h-full w-full">
      <header className="flex items-center justify-between border-b p-2 gap-2">
        <div className="flex items-center gap-2">
          <Button variant="link" onClick={goBack} className="hidden sm:flex">
            <ChevronLeft />
            <span>Back</span>
          </Button>
          <LocationWidget />
        </div>
        <Button onClick={openTicketModal}>New Ticket</Button>
      </header>
      <ScrollArea>
        <Outlet />
      </ScrollArea>
    </div>
  );
}
