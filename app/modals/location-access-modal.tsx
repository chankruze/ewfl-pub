import { useEffect, useState } from "react";
import { LocationWidget } from "~/components/location-widget";
import { Button } from "~/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "~/components/ui/dialog";
import { useLocationStore } from "~/hooks/location-store";

export const LocationAccessModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { permission } = useLocationStore();

  useEffect(() => {
    if (permission !== "granted") {
      setIsOpen(true);
    }

    setIsOpen(false);
  }, [permission]);

  return (
    <Dialog open={isOpen}>
      <DialogContent className="overflow-hidden bg-white p-6 text-black">
        <DialogHeader>
          <DialogTitle className="text-start text-2xl font-bold capitalize">
            Allow access to your location
          </DialogTitle>
          <DialogDescription className="text-start text-zinc-500">
            Location is required to perform a geospatial search. Geospatial
            search is required to show you the nearby e-waste facility centers.
          </DialogDescription>
        </DialogHeader>
        <LocationWidget />
        <DialogFooter>
          <Button>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
