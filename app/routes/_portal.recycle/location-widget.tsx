import { Locate } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useGeoLocation } from "~/hooks/use-geo-location";

export const LocationWidget = () => {
  const { location, permission, requestLocation } = useGeoLocation();

  if (permission === "granted")
    return (
      <Button variant="secondary" onClick={requestLocation}>
        {location.latitude}, {location.longitude}
      </Button>
    );

  return (
    <Button onClick={requestLocation}>
      <Locate className="w-4 h-4 mr-1" />
      Grant Location
    </Button>
  );
};
