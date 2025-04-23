"use client"

import { useTransition } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Save, Loader2 } from "lucide-react"
import ReactMarkdown from "react-markdown"
import { useSession } from "next-auth/react"

import type { getAllCategoryType } from "@/db/category"
import type { getAllTagsType } from "@/db/tags"

import { postSchema, defaultValues, type PostType } from "../schema"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileUpload } from "@/components/file-upload"
import { TagSelector } from "./tag-selector"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { createPostAction } from "../action/create-post"

// Markdown preview styles - add these to your global CSS or component
const markdownStyles = {
  heading1: "text-3xl font-bold mb-4 mt-6 border-b pb-1",
  heading2: "text-2xl font-bold mb-3 mt-5 border-b pb-1",
  heading3: "text-xl font-bold mb-2 mt-4",
  heading4: "text-lg font-bold mb-2 mt-3",
  paragraph: "mb-4",
  list: "list-disc ml-6 mb-4",
  orderedList: "list-decimal ml-6 mb-4",
  listItem: "mb-1",
  blockquote: "border-l-4 border-gray-300 pl-4 italic my-4",
  code: "bg-gray-100 p-1 rounded",
  codeBlock: "bg-gray-100 p-3 rounded my-4 overflow-x-auto",
  link: "text-blue-600 hover:underline",
  image: "max-w-full h-auto my-4",
}

export function WriteBlog({ categories, tags }: { categories: getAllCategoryType[]; tags: getAllTagsType[] }) {
  const [isPending, startTransition] = useTransition()
  const { data: session } = useSession()
  const userEmail = session?.user?.email || ""

  const form = useForm<PostType>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      ...defaultValues,
      userEmail,
      tags: [],
    },
    mode: "onChange",
  })

  const markdownContent = form.watch("content") || ""

  const onSubmit = async (values: PostType) => {
    startTransition(async () => {
      try {
        console.log("Form values:", values)
        alert(JSON.stringify(values))

        // Call the server-side function to create the post
        const response = await createPostAction(values)

        if (response.success) {
          toast.success("Post submitted successfully!")
        } else {
          toast.error(response.message || "An error occurred while submitting the form")
        }
      } catch (error) {
        console.error("Error during form submission:", error)
        toast.error("An error occurred while submitting the form")
      } finally {
        form.reset()
      }
    })
  }

  return (
    <div className="mt-2">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Image Upload */}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FileUpload label="Banner Image" onChange={field.onChange} value={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4 w-full">
            {/* Category Select */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-36 m-4">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} className="min-w-72" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="userEmail"
            render={({ field }) => (
              <FormItem className="w-36">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="text" disabled {...field} value={userEmail} className="min-w-72" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Tag Selector */}
          <TagSelector tags={tags} />

          {/* Textarea with Markdown Preview */}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Editor */}
                    <div className="w-full md:w-1/2">
                      <Textarea
                        placeholder="Write your blog content here in Markdown..."
                        className="min-h-[300px]"
                        {...field}
                      />
                    </div>

                    {/* Preview with proper styling */}
                    <div className="w-full md:w-1/2 border rounded-md p-4 bg-muted overflow-y-auto min-h-[300px]">
                      <div className="prose prose-sm max-w-none">
                        <ReactMarkdown
                          components={{
                            h1: ({ node, ...props }) => <h1 className={markdownStyles.heading1} {...props} />,
                            h2: ({ node, ...props }) => <h2 className={markdownStyles.heading2} {...props} />,
                            h3: ({ node, ...props }) => <h3 className={markdownStyles.heading3} {...props} />,
                            h4: ({ node, ...props }) => <h4 className={markdownStyles.heading4} {...props} />,
                            p: ({ node, ...props }) => <p className={markdownStyles.paragraph} {...props} />,
                            ul: ({ node, ...props }) => <ul className={markdownStyles.list} {...props} />,
                            ol: ({ node, ...props }) => <ol className={markdownStyles.orderedList} {...props} />,
                            li: ({ node, ...props }) => <li className={markdownStyles.listItem} {...props} />,
                            blockquote: ({ node, ...props }) => (
                              <blockquote className={markdownStyles.blockquote} {...props} />
                            ),
                            a: ({ node, ...props }) => <a className={markdownStyles.link} {...props} />,
                            img: ({ node, ...props }) => <img className={markdownStyles.image} {...props} />,
                          }}
                        >
                          {markdownContent}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Post
              </>
            )}
          </Button>
        </form>
      </FormProvider>
    </div>
  )
}
