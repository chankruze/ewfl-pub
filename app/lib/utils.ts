import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type FormDataJSON = {
  [key: string]: any;
};

export const formToJSON = (formData: FormData): FormDataJSON => {
  return Object.fromEntries(formData);
};

export function avatarTextFromName(name: string): string {
  const nameParts = name.split(" ");

  if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();

  if (nameParts.length >= 2)
    return `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`.toUpperCase();

  return name;
}
