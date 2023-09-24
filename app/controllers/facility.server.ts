import { prisma } from "~/lib/db.server";

export const geospatialQuery = async (
  lng: number,
  lat: number,
  range: number
) => {
  // This will fail after pnpx prisma db push
  // const result = await prisma.facility.findRaw({
  //   filter: {
  //     location: {
  //       $near: {
  //         $geometry: { type: "Point", coordinates: [85.77945, 20.26671] },
  //         $minDistance: 0,
  //         $maxDistance: 50,
  //       },
  //     },
  //   },
  // });

  const result = await prisma.facility.findRaw({
    filter: {
      location: {
        $geoWithin: {
          $centerSphere: [[lng, lat], range],
        },
      },
    },
  });

  return result;
};
