import type { RecyleTicket } from "@prisma/client";
import { Link } from "@remix-run/react";
import { Badge } from "~/components/ui/badge";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { cn } from "~/lib/utils";

type TicketCardProps = React.ComponentProps<typeof Card> & {
  data: Pick<
    RecyleTicket,
    "id" | "tktId" | "image" | "status" | "title" | "description"
  >;
};

export const TicketCard = ({ className, data, ...props }: TicketCardProps) => {
  return (
    <Link to={data.id} className="h-full">
      <Card className={cn("h-full lg:w-[380px]", className)} {...props}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="text-lg">{data.tktId}</span>
            <Badge>{data.status}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 font-roboto">
          <div className="w-full h-48 bg-stone-100 flex items-center justify-center">
            <img
              src={data.image}
              alt={data.tktId}
              className="object-cover h-full"
              loading="lazy"
            />
          </div>
          <div className="line-clamp-4">{data.description}</div>
        </CardContent>
      </Card>
    </Link>
  );
};
