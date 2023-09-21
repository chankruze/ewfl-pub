import { useEffect, useState } from "react";

type LocationType = {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
};

export const useGeoLocation = () => {
  const [location, setLocation] = useState<LocationType>({
    latitude: null,
    longitude: null,
    error: null,
  });
  const [permission, setPermission] = useState<PermissionState>("prompt");

  useEffect(() => {
    // Check if geolocation is available in the browser
    if ("geolocation" in navigator) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((result) => {
          setPermission(result.state);
          requestLocation();
        })
        .catch((error) => {
          setLocation({
            latitude: null,
            longitude: null,
            error: error.message,
          });
        });
    } else {
      setLocation({
        latitude: null,
        longitude: null,
        error: "Geolocation is not available in this browser.",
      });
    }
  }, []);

  const requestLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPermission("granted");
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => {
        setLocation({
          latitude: null,
          longitude: null,
          error: error.message,
        });
      }
    );
  };

  return { location, permission, requestLocation };
};
