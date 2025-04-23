import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateUsername(email: string | null): string {
  // Return a random string if email is null
  if (!email) return Math.random().toString(36).substring(2, 10);

  // Extract the part before '@'
  let base = email.split('@')[0];

  // Remove all non-alphanumeric characters (dots, underscores, etc.) and convert to lowercase
  base = base.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

  // Generate a random 3-digit number
  const randomNum = Math.floor(100 + Math.random() * 900);

  // Append the random number and return
  return base + randomNum;
}
