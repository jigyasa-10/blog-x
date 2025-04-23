import { getUserByEmail } from "@/db/user"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { deleteBlog } from "@/actions/actions"

export default async function ProfilePage() {
  const session = await auth()

  if (!session) {
    redirect("/api/auth/signin")
  }

  const email = session?.user?.email || ""
  const userData = await getUserByEmail(email)

  if (!userData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl">User not found</p>
      </div>
    )
  }

  const { name, image, posts } = userData
  const blogCount = posts.length

  return (
    <div className="container mx-auto py-20 px-4 max-w-4xl">
      <div className="flex flex-col items-center space-y-6">
        {/* User Profile Section */}
        <div className="w-full bg-white rounded-lg shadow-md p-6 dark:bg-gray-800">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={image || ""} alt={name || "User"} />
              <AvatarFallback className="text-2xl">{name ? name.charAt(0).toUpperCase() : "U"}</AvatarFallback>
            </Avatar>

            <div className="flex flex-col space-y-2 text-center md:text-left">
              <h1 className="text-3xl font-bold">{name || "User"}</h1>
              <p className="text-gray-500 dark:text-gray-400">{email}</p>
              <p className="text-sm">
                <span className="font-medium">{blogCount}</span> {blogCount === 1 ? "blog" : "blogs"} published
              </p>
            </div>
          </div>
        </div>

        {/* Blogs Section */}
        <div className="w-full">
          <h2 className="text-2xl font-bold mb-6">Your Blogs</h2>

          {blogCount === 0 ? (
            <div className="text-center py-10 bg-gray-50 rounded-lg dark:bg-gray-800/50">
              <p className="text-gray-500 dark:text-gray-400">You haven't published any blogs yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  <Link href={`/blog/${post.id}`} className="block">
                    <div className="aspect-video w-full overflow-hidden">
                      {post.image ? (
                        <img
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          <p className="text-gray-500 dark:text-gray-400">No image</p>
                        </div>
                      )}
                    </div>
                    <CardHeader>
                      <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                    </CardHeader>
                  </Link>
                  <CardFooter className="flex justify-end p-4">
                    {/* @ts-ignore */}
                    <form action={deleteBlog}>
                      <input type="hidden" name="blogId" value={post.id} />
                      <input type="hidden" name="email" value={email} />
                      <Button variant="destructive" size="sm" type="submit">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </form>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
