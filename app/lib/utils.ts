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
