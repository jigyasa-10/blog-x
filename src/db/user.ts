import { db } from "@/db";
import { Prisma } from "@prisma/client";

export type getUserByEmailType = Prisma.UserGetPayload<{
  select: {
    id: true;
    email: true;
    name: true;
    image: true;
    posts: {
      select: {
        id: true;
        title: true;
        image: true;
      };
    };
  };
}>;

export function getUserByEmail(email: string): Promise<getUserByEmailType | null> {
  return db.user.findFirst({
    select: {
      id: true,
      email: true,
      name: true,
      image: true,
      posts: {
        select: {
          id: true,
          title: true,
          image: true,
        },
      },
    },
    where: {
      email,
    },
  });
}

