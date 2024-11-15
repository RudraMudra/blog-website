"use client";

import Link from "next/link";
import { Table, Divider, Tag, Button } from "antd";
import { usePosts } from "@/lib/firebase/post/read";

export default function PostListView() {
  const { data, isLoading, error } = usePosts();
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
      title: "Title",
      dataIndex: "title",
      key: "Name",
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
        <Link href={`/admin/posts/form?id=${record?.id}`}>
          <span>
            <Link href={`/admin/posts/${record.id}`}>
              <Button className="bg-yellow-300" type="dashed">
                View
              </Button>
            </Link>
          </span>
          <span style={{ marginLeft: 8 }}>
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
