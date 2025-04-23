"use server"

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { postSchema } from "../schema"
import { db } from "@/db";
import type { z } from "zod"
import crypto from "crypto"


const BUCKET_NAME = "school-x";
const s3 = new S3Client({
  region: process.env.MINIO_REGION || "us-east-1",
  endpoint: process.env.MINIO_ENDPOINT || "http://localhost:9000",
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY || "user",
    secretAccessKey: process.env.MINIO_SECRET_KEY || "password",
  },
  forcePathStyle: true,
});


const MINIO_PUBLIC_URL = process.env.MINIO_PUBLIC_URL || "http://localhost:9000";
const uploadFile = async (file: File | null): Promise<string | null> => {
  if (!file) return null;

  try {
    const uniqueId = crypto.randomBytes(16).toString("hex");
    const fileKey = `uploads/${uniqueId}-${file.name}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    await s3.send(
      new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: fileKey,
        Body: buffer,
        ContentType: file.type,
      })
    );

    return `${MINIO_PUBLIC_URL}/${BUCKET_NAME}/${fileKey}`;
  } catch (error) {
    console.error("File upload failed:", error);
    return null;
  }
};

export async function createPostAction(values: z.infer<typeof postSchema>) {
  try {
    const parsedValues = postSchema.parse(values)

    const existingUser = await db.user.findUnique({
      where: { email: parsedValues.userEmail },
    })

    if (!existingUser) {
      return {
        success: false,
        message: "User with this email doesn't exist.",
      }
    }
    // ✅ Upload the image and ensure type is string | null
    const imageUrl: string | null = await uploadFile(parsedValues.image || null)

    const post = await db.post.create({
      data: {
        title: parsedValues.title,
        content: parsedValues.content,
        image: imageUrl ? imageUrl : "", // ✅ explicit string
        author: {
          connect: { email: parsedValues.userEmail },
        },
        category: {
          connect: { id: parsedValues.category },
        },
        tags: {
          connect: parsedValues.tags.map((tagId) => ({ id: tagId })),
        },
      },
    })

    return {
      success: true,
      message: "Blog post created successfully",
      postId: post.id,
    }
  } catch (error) {
    console.error("Error creating blog post:", error)

    if (error instanceof Error) {
      if (error.message.includes("Foreign key constraint failed")) {
        return {
          success: false,
          message: "Invalid category or tag selection",
          error: error.message,
        }
      }
    }

    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error occurred",
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}
