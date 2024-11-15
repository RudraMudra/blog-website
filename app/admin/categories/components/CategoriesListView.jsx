"use client";

import { useCategories } from "@/lib/firebase/category/read";
import Link from "next/link";
import { Table, Divider, Tag, Button } from "antd";

export default function CategoriesListView() {
  const { data, isLoading, error } = useCategories();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  if (data.length === 0) {
    return <div>No categories found</div>;
  }
  const columns = [
    {
      title: "Index",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Image",
      key: "ImageURL",
      render: (record) => (
        <img
          src={record.imageURL}
          alt={record.name}
          style={{ width: 220, height: 120 }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Link href={`/admin/categories/form?id=${record?.id}`}>
          <span>
            <Button type="primary">Edit</Button>
          </span>
        </Link>
      ),
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={data} rowKey="id" />
    </div>
  );
}
