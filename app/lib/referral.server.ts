import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 8);

export const generateReferralCode = () => {
  const code = nanoid();
  return code;
};

export const generateReferralLink = (code: string) => {
  const link = `https://example.com/referral/${code}`;
  return link;
};

export const generateReferralQRCode = (link: string) => {
  const qrCode = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${link}`;
  return qrCode;
};
