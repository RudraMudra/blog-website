import { getAllCategories } from "@/lib/firebase/category/read_server";
import Link from "next/link";

export default async function Page() {
    const categories = await getAllCategories();
    return (
        <main className="p-10">
            <div className="grid grid-cols-4">
                {categories?.map((category, key) => (
                    <div>
                        <CategoryCard category={category} key={key}/>
                        {/* <p>{category.description}</p> */}
                    </div>
                ))}
            {/* <h1>Categories</h1> */}
            </div>
        </main>
    );
}

function CategoryCard({category}) {
    return (
        <Link href={`/categories/${category?.id}`}>
        <div className="flex flex-col items-center justify-center gap-2 hover:bg-blue-50 rounded-xl p-6" key={category?.id}>
            <img className="h-28 w-28 object-cover" src={category?.imageURL} alt={category.name} />
            <h1 className="font-bold">{category?.name}</h1>
            {/* <p>{category.description}</p> */}
        </div>
        </Link>
    );
}