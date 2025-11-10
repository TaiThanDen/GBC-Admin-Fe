import DynamicTable from "../components/modules/Shared/DynamicTable";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useState } from "react";
import type { NewDocument } from "~/components/modules/Documents/AddDocument";
import AddDocumentModal from "../components/modules/Documents/AddDocument";
import { Link } from "react-router";
import { RiEditLine } from "react-icons/ri";

const posts = [
  {
    id: 1,
    title: "Hướng dẫn sử dụng truy xuất nguồn gốc ",
    tag: "Công nghệ",
    date: "15/07/2024",
    thumbnail:
      "https://newocean.edu.vn/wp-content/uploads/2025/01/chinh-tri-vuong-quoc-anh.jpg",
  },
  {
    id: 2,
    title: "Tài liệu về nông nghiệp bền vững",
    tag: "Bền vững",
    date: "12/07/2024",
    thumbnail:
      "https://deviet.vn/wp-content/uploads/2019/04/vuong-quoc-anh.jpg",
  },
];

export default function DocumentPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(posts);

  const handleAddDocument = (newDoc: NewDocument) => {
    const newId = data.length ? Math.max(...data.map((p) => p.id)) + 1 : 1;
    const doc = {
      id: newId,
      title: newDoc.title,
      tag: newDoc.tag,
      date: new Date().toLocaleDateString("vi-VN"),
      thumbnail: "", // hoặc lấy từ file nếu có
    };
    setData((prev) => [...prev, doc]);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-4 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            Quản lý tài liệu
          </h1>
          <h3 className="text-sm font-medium text-gray-500">
            Quản lý tất cả các tài liệu về truy xuất nguồn gốc
          </h3>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex gap-1 items-center"
        >
          <IoIosAddCircleOutline className="text-xl" />
          Tạo tài liệu mới
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
          <Link to={`/document/${item.id}`}>
            <button className="text-blue-600 cursor-pointer text-2xl">
              <RiEditLine />
            </button>
          </Link>
        )}
      />

      {/* Modal thêm bài viết */}
      <AddDocumentModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleAddDocument}
        tags={["Hướng dẫn", "Biểu mẫu", "Quy trình", "Khác"]}
      />
    </div>
  );
}
