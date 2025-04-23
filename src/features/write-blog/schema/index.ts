import { z } from "zod"

export const postSchema = z.object({
  userEmail: z.string(),
  image: z.instanceof(File).optional(), // Optional file upload
  tags: z.array(z.string()),
  title: z.string(),
  content: z.string(),
  category: z.string(),
})

export type PostType = z.infer<typeof postSchema>

export const defaultValues: PostType = {
  userEmail: "",
  image: undefined,
  tags: [],
  content: "",
  title: "",
  category: "",
}
