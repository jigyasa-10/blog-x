import { Prisma } from "@prisma/client";
import { db } from "@/db";

export type getAllTagsType = Prisma.TagGetPayload<{
  select: {
    id: true,
    name: true
  };
}>;
export function getAllTags(): Promise<getAllTagsType[]> {
  return db.tag.findMany({
    select: { id: true, name: true }
  });
}
