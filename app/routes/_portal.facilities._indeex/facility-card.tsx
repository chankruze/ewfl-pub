import { useNavigate } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

type FacilityCardProps = {
  facility: {
    id: string;
    name: string;
    location: {
      latitude: number;
      longitude: number;
    };
    image: string;
    address: string;
  };
};

export const FacilityCard = ({ facility }: FacilityCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="w-[300px] border-none p-0 rounded-none">
      <CardHeader className="p-2">
        <CardTitle className="text-xl">{facility.name}</CardTitle>
        <CardDescription className="text-sm">{facility.address}</CardDescription>
      </CardHeader>
      <CardContent className="p-2">
        <img
          src={facility.image}
          className="w-full max-h-48 object-cover"
          alt={facility.name}
        />
      </CardContent>
      <CardFooter className="flex justify-between p-2">
        <Button className="w-full" onClick={() => navigate(facility.id)}>
          Book a Ticket
        </Button>
      </CardFooter>
    </Card>
  );
};
