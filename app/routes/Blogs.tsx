import DynamicTable from "../components/modules/Shared/DynamicTable";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useState } from "react";
import AddPostModal from "../components/resuable/AddModal";
import type { NewPost } from "../components/resuable/AddModal";
import { Link } from "react-router";
import { RiEditLine } from "react-icons/ri";

const posts = [
  {
    id: 1,
    title: "Blockchain trong truy xuất nguồn gốc nông sản",
    tag: "Công nghệ",
    date: "15/07/2024",
    thumbnail:
      "https://newocean.edu.vn/wp-content/uploads/2025/01/chinh-tri-vuong-quoc-anh.jpg",
  },
  {
    id: 2,
    title: "Tương lai của nông nghiệp bền vững",
    tag: "Bền vững",
    date: "12/07/2024",
    thumbnail:
      "https://deviet.vn/wp-content/uploads/2019/04/vuong-quoc-anh.jpg",
  },
];

export default function BlogPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(posts);

  const handleAddPost = (newPost: NewPost) => {
    const newId = data.length ? Math.max(...data.map((p) => p.id)) + 1 : 1;
    const post = {
      id: newId,
      title: newPost.title,
      tag: newPost.tag,
      author: "Admin",
      date: new Date().toLocaleDateString("vi-VN"),
      status: newPost.status,
      thumbnail: "",
    };
    setData((prev) => [...prev, post]);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-4 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            Quản lý bài viết
          </h1>
          <h3 className="text-sm font-medium text-gray-500">
            Quản lý tất cả các bài viết/blog về truy xuất nguồn gốc
          </h3>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex gap-1 items-center"
        >
          <IoIosAddCircleOutline className="text-xl" />
          Tạo bài viết mới
        </button>
      </div>

      {/* Table */}
      <DynamicTable
        data={data}
        columns={[
          {
            key: "title",
            label: "Tiêu đề",
            render: (item) => <span>{item.title}</span>,
          },
          {
            key: "thumbnail",
            label: "Ảnh bìa",
            render: (item) =>
              item.thumbnail ? (
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded-md"
                />
              ) : (
                <span className="text-gray-400">Không có ảnh</span>
              ),
          },
          { key: "tag", label: "Tag" },
          { key: "date", label: "Ngày xuất bản" },
        ]}
        filters={[
          { label: "Tất cả tag", value: "1" },
          { label: "Khoa học", value: "7" },
          { label: "Nông nghiệp", value: "30" },
          { label: "Công nghệ", value: "month" },
          { label: "Công nông", value: "year" },
        ]}
        searchPlaceholder="Tìm kiếm bài viết..."
        onFilterChange={(value) => console.log("Lọc:", value)}
        renderAction={(item) => (
          <Link to={`/post/${item.id}`}>
            <button className="text-blue-600 cursor-pointer text-2xl">
              <RiEditLine />
            </button>
          </Link>
        )}
      />

      {/* Modal thêm bài viết */}
      <AddPostModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleAddPost}
        tags={["Công nghệ", "Bền vững", "Khoa học", "Nông nghiệp"]}
      />
    </div>
  );
}
