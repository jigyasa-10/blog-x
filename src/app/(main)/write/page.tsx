import { getAllCategoryType, getAllCategory } from "@/db/category";
import { getAllTagsType, getAllTags } from "@/db/tags";

import { WriteBlog } from "@/features/write-blog/components/write-blog";

export default async function PostEditor() {
  const categories: getAllCategoryType[] = await getAllCategory();
  const tags: getAllTagsType[] = await getAllTags();

  return (
    <div className="mx-auto max-w-[1200px] mt-40">
      <WriteBlog categories={categories} tags={tags} />
    </div>
  );
}

