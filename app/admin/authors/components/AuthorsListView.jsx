"use client";

// import { useCategories } from "@/lib/firebase/category/read";
import Link from "next/link";
import { Table, Divider, Tag, Button } from "antd";
import { useAuthors } from "@/lib/firebase/author/read";
import { CircleSlash2 } from "lucide-react";

export default function AuthorsListView() {
  const { data, isLoading, error } = useAuthors();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  if (data.length === 0) {
    return <div className=""><CircleSlash2 />Authors found...  </div>;
  }
  const columns = [
    {
      title: "Index",
      key: "Index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Photo",
      key: "ImageURL",
      render: (record) => (
        <img
          src={record.imageURL}
          alt={record.name}
          style={{ width: 250, height: 160 }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Link href={`/admin/authors/form?id=${record.id}`}>
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
