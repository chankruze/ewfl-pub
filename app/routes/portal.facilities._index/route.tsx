import { getAuth } from "@clerk/remix/ssr.server";
import type { Facility } from "@prisma/client";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import "mapbox-gl/dist/mapbox-gl.css";
import { useMemo, useState } from "react";
import {
  FullscreenControl,
  GeolocateControl,
  Map,
  Marker,
  NavigationControl,
  Popup,
  ScaleControl,
} from "react-map-gl";
import { LocationWidget } from "~/components/location-widget";
import { Pin } from "~/components/pin";
import { SITE_DESCRIPTION, SITE_TITLE } from "~/consts";
import { useLocationStore } from "~/hooks/location-store";
import { prisma } from "~/lib/db.server";
import { FacilityCard } from "./facility-card";

export const meta: MetaFunction = () => {
  return [
    { title: `Facilities / ${SITE_TITLE}` },
    {
      property: "og:title",
      content: `Facilities / ${SITE_TITLE}`,
    },
    { name: "description", content: SITE_DESCRIPTION },
  ];
};

export const loader = async (args: LoaderFunctionArgs) => {
  const { userId } = await getAuth(args);

  if (!userId) return redirect("/sign-in");

  // const facilities = await (
  //   await fetch(
  //     "https://my.api.mockaroo.com/facility.json?key=cf5ee360&count=20"
  //   )
  // ).json();

  const facilities = await prisma.facility.findMany({});

  return json({
    MAPBOX_API_KEY: process.env.MAPBOX_API_KEY,
    facilities,
  });
};

export default function FacilitiesMapPage() {
  const { MAPBOX_API_KEY, facilities } = useLoaderData<typeof loader>();
  const { location } = useLocationStore();
  const [selectedFacility, setselectedFacility] = useState<Facility | null>();

  const pins = useMemo(
    () =>
      facilities.map((facility, _idx) => (
        <Marker
          key={`facility-${_idx}`}
          longitude={facility.location.coordinates[0]}
          latitude={facility.location.coordinates[1]}
          anchor="bottom"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setselectedFacility(facility);
          }}
        >
          <Pin facility={facility} />
        </Marker>
      )),
    []
  );

  return (
    <div className="h-full w-full relative">
      <div className="absolute p-4 top-0 right-0 z-10">
        <LocationWidget />
      </div>
      <Map
        reuseMaps
        initialViewState={{
          latitude: location.latitude,
          longitude: location.longitude,
          zoom: 14,
          bearing: 0,
          pitch: 0,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={MAPBOX_API_KEY}
      >
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />
        {pins}
        {selectedFacility ? (
          <Popup
            anchor="top"
            longitude={Number(selectedFacility.location.coordinates[0])}
            latitude={Number(selectedFacility.location.coordinates[1])}
            onClose={() => setselectedFacility(null)}
            style={{
              border: 0,
              padding: 0,
              margin: 0,
              outline: 0,
            }}
            maxWidth="358px"
          >
            <FacilityCard facility={selectedFacility} />
          </Popup>
        ) : null}
      </Map>
    </div>
  );
}
