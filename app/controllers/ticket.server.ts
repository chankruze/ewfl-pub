import { z } from "zod";
import { prisma } from "~/lib/db.server";
import { generateTicketId } from "~/lib/ticket.server";
import { formToJSON } from "~/lib/utils";

// const MAX_FILE_SIZE = 500000;
// const ACCEPTED_IMAGE_TYPES = [
//   "image/jpeg",
//   "image/jpg",
//   "image/png",
//   "image/webp",
// ];

const ticketSchema = z.object({
  title: z.string().nonempty("Title is required!"),
  // image: z.custom<File | Buffer>((data) => {
  //   return typeof window === "undefined"
  //     ? data instanceof Buffer
  //     : data instanceof File;
  // }, "Data is not an instance of a Buffer or File"),
  // image: z
  //   .any()
  //   .refine((files) => files?.length == 1, "Image is required."),
  // .refine(
  //   (files) => files?.[0]?.size <= MAX_FILE_SIZE,
  //   `Max file size is 5MB.`
  // )
  // .refine(
  //   (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
  //   ".jpg, .jpeg, .png and .webp files are accepted."
  // ),
  image: z.any(),
  description: z.string(),
});

export const createRecycleTicket = async (
  data: FormData,
  userId: string,
  facilityId: string
): Promise<any> => {
  const _validation = ticketSchema.safeParse(formToJSON(data));

  if (_validation.success) {
    const { title, image, description } = _validation.data;
    const tktId = generateTicketId();

    try {
      return await prisma.ticket.create({
        data: {
          title,
          description,
          image,
          tktId,
          facility: {
            connect: {
              id: facilityId,
            },
          },
          userProfile: {
            connect: {
              userId,
            },
          },
        },
      });
    } catch (e) {
      console.error(e);
      return { error: "Unable to create a ticket" };
    }
  }

  return { error: { ..._validation.error.format() } };
};
