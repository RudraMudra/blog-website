import { getAuthor } from "@/lib/firebase/author/read_server";
import { getCategory } from "@/lib/firebase/category/read_server";
import { getAllPosts } from "@/lib/firebase/post/read_server";
import Link from "next/link";

export default async function PostListView() {
  const posts = await getAllPosts();
  if (!posts) {
    return <div>No posts found in the database</div>;
  }
  return (
    <section className="p-8">
      <div className="grid grid-cols-4 gap-4">
        {posts?.map((post, index) => {
          return <PostCard post={post} key={index} />;
        })}
      </div>
    </section>
  );
}

export function PostCard({ post }) {
  return (
    <Link href={`/posts/${post?.id}`}>
      <div className="flex flex-col gap-3 p-5" key={post.id}>
        <div className="relative">
          <div className="absolute flex justify-end w-full p-3">
            <CategoryCard categoryId={post?.categoryId} />
          </div>
          <img
            className="h-[270px] w-[650px] object-fit"
            src={post?.imageURL}
            alt={post?.title}
          />
        </div>
        <h1 className="font-bold ">{post?.title}</h1>
        <div className="flex justify-between">
          <AuthorCard authorId={post?.authorId} />
          <h5 className="text-xs text-gray-500">
            {post?.timestamp?.toDate()?.toLocaleDateString()}
          </h5>
        </div>
      </div>
    </Link>
  );
}

async function AuthorCard({ authorId }) {
  const author = await getAuthor(authorId);
  return (
    <div className="flex gap-2 items-center">
      <img
        className="h-7 w-7 rounded-full object-cover"
        src={author?.imageURL}
        alt={author?.name}
      />
      <h1 className="text-sm text-gray-500">{author?.name}</h1>
      {/* <h5>{author?.email}</h5> */}
    </div>
  );
}

async function CategoryCard({ categoryId }) {
  const category = await getCategory(categoryId);
  return (
    <div className="flex gap-2 items-center bg-white bg-opacity-60 rounded px-2 py-1">
      <img
        className="h-7 w-7 rounded-full object-cover"
        src={category?.imageURL}
        alt={category?.name}
      />
      <h1 className="text-sm font-bold">{category?.name}</h1>
      {/* <h5>{author?.email}</h5> */}
    </div>
  );
}
