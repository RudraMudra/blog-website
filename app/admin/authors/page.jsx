import { Button } from "antd";
import { CopyPlus } from "lucide-react";
import Link from "next/link";
import AuthorsListView from "./components/AuthorsListView";


export default function CategoriesPage() {
  return (
    <div className="p-6 w-full flex flex-col gap-6">
      <div className="flex gap-3 justify-between items-center">
        <h1 className="font-bold">Authors</h1>
        <Link href="/admin/authors/form">
          <Button
            className=" flex gap-2 items-center text-white"
            type="primary"
          >
            <CopyPlus />
            Add Author
          </Button>
        </Link>
      </div>
      <AuthorsListView />
    </div>
  );
}
