import { Prisma } from "@prisma/client";
import { db } from "@/db";

export type getAllCategoryType = Prisma.CategoryGetPayload<{
  select: {
    id: true,
    name: true
  };
}>;
export function getAllCategory(): Promise<getAllCategoryType[]> {
  return db.category.findMany({
    select: { id: true, name: true }
  });
}
