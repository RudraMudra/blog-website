import { Button } from "antd";
import { CopyPlus } from "lucide-react";
import Link from "next/link";
import CategoriesListView from "./components/CategoriesListView";

export default function CategoriesPage() {
  return (
    <div className="p-6 w-full flex flex-col gap-6">
      <div className="flex gap-3 justify-between items-center">
        <h1 className="font-bold">Categories</h1>
        <Link href="/admin/categories/form">
          <Button
            className=" flex gap-2 items-center text-white"
            type="primary"
          >
            <CopyPlus />
            Add Category
          </Button>
        </Link>
      </div>
      <CategoriesListView />
    </div>
  );
}
