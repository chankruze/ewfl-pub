import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 6);

export const generateFacId = () => {
  const code = nanoid();
  return `EWFL_FAC_${code}`;
};

export const generateEmailFromFacId = (
  facId: string,
  prefix: string,
  domain: string
) => {
  // Check if the input string matches the expected format
  const regex = /^EWFL_FAC_([A-Z0-9_]+)$/;

  if (regex.test(facId)) {
    // Extract the 'code' part from the input string
    const code = facId.replace(/^EWFL_FAC_/, "");

    // Convert the 'code' to lowercase and construct the desired email format
    const email = `${prefix}.${code.toLowerCase()}@${domain}`;

    return email;
  } else {
    return "Invalid input format";
  }
};
