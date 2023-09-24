import { create } from "zustand";

type LocationType = {
  latitude: number;
  longitude: number;
  error: string | null;
};

type LocationStore = {
  location: LocationType;
  permission: PermissionState;
  setLocation: (location: LocationType, permission: PermissionState) => void;
};

export const useLocationStore = create<LocationStore>((set) => ({
  location: {
    latitude: 20.2764,
    longitude: 85.7759,
    error: null,
  },
  permission: "prompt",
  setLocation: (location: LocationType, permission: PermissionState) =>
    set((state) => {
      if (!location.latitude || !location.longitude) {
        return {
          permission,
        };
      }

      return {
        location,
        permission,
      };
    }),
}));
