
import { notFound } from "next/navigation"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import MarkdownRenderer from "@/components/markdown-renderer"
import { getBlogWithId } from "@/db/blog"

export default async function BlogPage({ params }: { params: { id: string } }) {
  const blog = await getBlogWithId(params.id)

  if (!blog) {
    notFound()
  }


  return (
    <article className="container py-10 max-w-4xl mx-auto">
      <div className="relative w-full h-[400px] rounded-lg overflow-hidden mb-8">
        <Image src={blog.image || "/placeholder.svg"} alt={blog.title} fill className="object-cover" priority />
      </div>

      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Category:</span>
          <Badge variant="secondary">{blog.category.name}</Badge>
        </div>

        <div className="flex items-center gap-2 ml-4">
          <span className="text-muted-foreground">Tags:</span>
          {["varun", "generic", "science", "future"].map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="text-sm text-muted-foreground mb-6">
        Published on {new Date(blog.createdAt).toLocaleDateString()} by {blog.author.name}
      </div>

      <Separator className="mb-8" />

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <MarkdownRenderer content={blog.content} />
      </div>
    </article>
  )
}

