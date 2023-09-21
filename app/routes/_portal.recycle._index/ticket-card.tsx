import { Edit } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";
import { cn } from "~/lib/utils";

type TicketCardProps = React.ComponentProps<typeof Card> & {
  data: {
    id: string;
    description: string;
  };
};

export const TicketCard = ({ className, data, ...props }: TicketCardProps) => {
  return (
    <Card className={cn("w-[380px]", className)} {...props}>
      <CardHeader>
        <CardTitle>{data.id}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">{data.description}</CardContent>
      <CardFooter>
        <Button className="w-full">
          <Edit className="mr-2 h-4 w-4" /> Edit
        </Button>
      </CardFooter>
    </Card>
  );
};
