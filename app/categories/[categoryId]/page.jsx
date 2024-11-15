import { PostCard } from "@/app/components/PostListView";
import { getCategory } from "@/lib/firebase/category/read_server";
import { getAllPostsWithCategory } from "@/lib/firebase/post/read_server";

export default async function Page({ params }) {
  const { categoryId } = params;
  const posts = await getAllPostsWithCategory(categoryId);
  return (
    <main className="p-10">
        <div className="flex p-4 gap-2">
            <h1 className="font-bold">Categories /</h1>
            <CategoryCard categoryId={categoryId} />
        </div>
      <div className="grid grid-cols-4 gap-4">
        {posts.map((post) => {
          return <PostCard post={post} key={post.id} />;
        })}
      </div>
    </main>
  );
}

async function CategoryCard({ categoryId }) {
  const category = await getCategory(categoryId);
  return (
    <div className="flex gap-2 items-center bg-white bg-opacity-60 rounded px-2 py-1 border">
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
