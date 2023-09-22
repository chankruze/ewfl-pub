import { z } from "zod";
import { prisma } from "~/lib/db.server";
import { generateTicketId } from "~/lib/ticket.server";
import { formToJSON } from "~/lib/utils";

const ticketSchema = z.object({
  title: z.string().nonempty("Title is required!"),
  image: z.string().nonempty("Image is required!"),
  description: z.string(),
});

export const createRecycleTicket = async (
  formData: FormData,
  userId: string
) => {
  const _validation = ticketSchema.safeParse(formToJSON(formData));

  if (_validation.success) {
    const { title, image, description } = _validation.data;
    const tktId = generateTicketId();

    // TODO: upload image to cloudinary

    try {
      return await prisma.recyleTicket.create({
        data: {
          title,
          description,
          image: `https://picsum.photos/seed/${tktId}/200/300`,
          tktId,
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
