import type { RecyleTicket } from "@prisma/client";
import { prisma } from "~/lib/db.server";

export const createRecycleTicket = async (data: RecyleTicket) => {
  return await prisma.recyleTicket.create({
    data,
  });
};
