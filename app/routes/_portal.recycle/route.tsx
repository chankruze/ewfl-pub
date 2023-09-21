import { Outlet } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import { LocationWidget } from "./location-widget";

export default function RecyclePageLayout() {
  return (
    <div className="flex flex-col h-full w-full">
      <header className="flex items-center justify-between border-b p-2 gap-2">
        <LocationWidget />
        <Button>New Ticket</Button>
      </header>
      <ScrollArea>
        <Outlet />
      </ScrollArea>
    </div>
  );
}
