import { Prisma } from "@prisma/client";
import { db } from "@/db";

export type getAllBlogsType = Prisma.PostGetPayload<{
  select: {
    id: true,

    title: true,
    image: true,

    createdAt: true,
    updatedAt: true,

    author: true,
    comments: true,
  };
}>;

export async function getAllBlogs(): Promise<getAllBlogsType[]> {
  return await db.post.findMany({
    select: {
      id: true,

      title: true,
      image: true,

      createdAt: true,
      updatedAt: true,

      author: true,
      comments: true,
    },
  });
}


export type getBlogsWithIdType = Prisma.PostGetPayload<{
  select: {
    id: true;
    title: true;
    image: true;
    content: true;
    createdAt: true;
    updatedAt: true;
    author: true;
    comments: true;
    category: true;
  };
}>;

export async function getBlogWithId(id: string): Promise<getBlogsWithIdType | null> {
  return await db.post.findUnique({
    select: {
      id: true,
      title: true,
      image: true,
      content: true,
      createdAt: true,
      updatedAt: true,
      author: true,
      comments: true,
      category: true,
    },
    where: {
      id: id,
    },
  });
}
