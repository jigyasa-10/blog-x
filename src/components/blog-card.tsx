import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { CalendarIcon, UserIcon } from "lucide-react"
import { getAllBlogsType } from "@/db/blog"

interface BlogCardProps { blog: getAllBlogsType }

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <Link href={`/blog/${blog.id}`} className="block h-full">
      <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative w-full h-48">
          <Image src={blog.image || "/placeholder.svg"} alt={blog.title} fill className="object-cover" />
        </div>

        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary">{"generic"}</Badge>
          </div>
          <h3 className="text-xl font-bold line-clamp-2">{blog.title}</h3>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap gap-1 mb-4">
            {["varun", "generic", "tech"].slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className="text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4" />
              <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <UserIcon className="h-4 w-4" />
              <span>{blog.author.name}</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
