import type { MetaArgs } from "@remix-run/react";
import { Outlet, useNavigate } from "@remix-run/react";
import { ChevronLeft } from "lucide-react";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import { SITE_TITLE } from "~/consts";

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

export default function RecyclePageLayout() {
  const navigate = useNavigate();
  // const { onOpen } = useModal();

  const goBack = () => navigate(-1);

  // const openTicketModal = () => onOpen("createTicket", {});

  return (
    <div className="flex flex-col h-full w-full">
      <header className="flex items-center justify-between border-b p-2 gap-2">
        <div className="flex items-center gap-2">
          <Button variant="link" onClick={goBack} className="hidden sm:flex">
            <ChevronLeft />
            <span>Back</span>
          </Button>
        </div>
        {/* <Button onClick={openTicketModal}>New Ticket</Button> */}
      </header>
      <ScrollArea>
        <Outlet />
      </ScrollArea>
    </div>
  );
}
