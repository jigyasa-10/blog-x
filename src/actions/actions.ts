"use server"

import { db } from "@/db"
import { revalidatePath } from "next/cache"

export async function deleteBlog(formData: FormData) {
  const blogId = formData.get("blogId") as string
  const email = formData.get("email") as string

  if (!blogId || !email) {
    return { error: "Missing required fields" }
  }

  try {
    const user = await db.user.findFirst({
      where: { email },
      include: {
        posts: {
          where: { id: blogId },
        },
      },
    })

    if (!user || user.posts.length === 0) {
      return { error: "Unauthorized or blog not found" }
    }

    await db.post.delete({
      where: { id: blogId },
    })

    revalidatePath("/profile")

    return { success: true }
  } catch (error) {
    console.error("Error deleting blog:", error)
    return { error: "Failed to delete blog" }
  }
}
