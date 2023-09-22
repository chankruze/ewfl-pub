import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 8);

export const generateTicketId = () => {
  const code = nanoid();
  return `EWFL_TKT_${code}`;
};
