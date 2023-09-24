import { Locate } from "lucide-react";
import { useEffect } from "react";
import { Button } from "~/components/ui/button";
import { useLocationStore } from "~/hooks/location-store";

export const LocationWidget = () => {
  const { location, permission, setLocation } = useLocationStore();

  useEffect(() => {
    // Check if geolocation is available in the browser
    if ("geolocation" in navigator) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((result) => {
          requestLocation();
        })
        .catch((error) => {
          setLocation(
            {
              latitude: 0,
              longitude: 0,
              error: error.message,
            },
            "prompt"
          );
        });
    } else {
      setLocation(
        {
          latitude: 0,
          longitude: 0,
          error: "Geolocation is not available in this browser.",
        },
        "denied"
      );
    }
  }); // eslint-disable-line react-hooks/exhaustive-deps

  const requestLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(
          {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          },
          "granted"
        );
      },
      (error) => {
        setLocation(
          {
            latitude: 0,
            longitude: 0,
            error: error.message,
          },
          "prompt"
        );
      }
    );
  };

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
