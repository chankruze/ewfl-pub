import { Locate } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useGeoLocation } from "~/hooks/use-geo-location";

export const LocationWidget = () => {
  const { location, permission, requestLocation } = useGeoLocation();

  return (
    <div className="flex items-center gap-1">
      {permission === "granted" ? (
        <>
          <Button variant="ghost" onClick={requestLocation}>
            {location.latitude}, {location.longitude}
          </Button>
        </>
      ) : (
        <Button onClick={requestLocation}>
          <Locate className="w-4 h-4" />
          Grant Location
        </Button>
      )}
    </div>
  );
};
