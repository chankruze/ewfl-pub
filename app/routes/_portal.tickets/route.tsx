import { Outlet, useNavigate } from "@remix-run/react";
import { ChevronLeft } from "lucide-react";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";

export default function RecyclePageLayout() {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <div className="flex flex-col h-full w-full">
      <header className="flex items-center justify-between border-b p-2 gap-2">
        <div className="flex items-center gap-2">
          <Button variant="link" onClick={goBack}>
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
