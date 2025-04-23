import BlogCard from "@/components/blog-card"
import { getAllBlogs } from "@/db/blog"
export default async function ExplorePage() {
  const blogs = await getAllBlogs()

  return (
    <div className="container py-10 mx-auto px-10 max-w-[1300px]">
      <h1 className="text-4xl font-bold mb-8">Explore Blogs</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  )
}

