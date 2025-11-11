import DynamicTable from "../components/modules/Shared/DynamicTable";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useState } from "react";
import type { NewDocument } from "~/components/modules/Documents/AddDocument";
import AddFileModal from "../components/modules/Tags/AddTag";
import { Link } from "react-router";
import { RiEditLine } from "react-icons/ri";

const files = [
  {
    id: 1,
    title: "Báo cáo tài chính",
    tag: "Kế toán",
    date: "15/07/2024",
    fileName: "baocao.pdf",
    thumbnail: "", // để trống hoặc null nếu không phải ảnh
  },
  {
    id: 2,
    title: "Biểu mẫu hợp đồng",
    tag: "Pháp lý",
    date: "12/07/2024",
    fileName: "hopdong.docx",
    thumbnail: "",
  },
  {
    id: 3,
    title: "Ảnh minh họa",
    tag: "Thiết kế",
    date: "10/07/2024",
    fileName: "minhhoa.xlsx",
  },
];

function getFileIconUrl(fileName: string) {
  const ext = fileName.split(".").pop()?.toLowerCase();
  if (!ext) return "";
  if (["pdf"].includes(ext))
    return "https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg";
  if (["doc", "docx"].includes(ext))
    return "https://upload.wikimedia.org/wikipedia/commons/e/e8/Microsoft_Office_Word_%282025%E2%80%93present%29.svg";
  if (["xls", "xlsx"].includes(ext))
    return "https://upload.wikimedia.org/wikipedia/commons/6/60/Microsoft_Office_Excel_%282025%E2%80%93present%29.svg";
  if (["png", "jpg", "jpeg", "gif"].includes(ext)) return ""; // sẽ dùng thumbnail
  return "https://cdn-icons-png.flaticon.com/512/4807/4807934.png";
}

export default function FilesPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(files);

  const handleAddDocument = (newDoc: NewDocument) => {
    const newId = data.length ? Math.max(...data.map((p) => p.id)) + 1 : 1;
    const doc = {
      id: newId,
      title: newDoc.title,
      tag: newDoc.tag,
      date: new Date().toLocaleDateString("vi-VN"),
      fileName: "",
      thumbnail: "",
    };
    setData((prev) => [...prev, doc]);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-4 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Quản lý file</h1>
          <h3 className="text-sm font-medium text-gray-500">
            Quản lý tất cả các file về truy xuất nguồn gốc
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
            key: "fileName",
            label: "File",
            render: (item) =>
              item.fileName ? (
                <div className="flex items-center gap-3">
                  {/* Icon file */}
                  <img
                    src={getFileIconUrl(item.fileName)}
                    alt={item.fileName}
                    className="w-10 h-10 object-cover rounded-md"
                  />
                  {/* Tên file */}
                  <span className="text-sm text-gray-800 truncate max-w-[160px]">
                    {item.fileName}
                  </span>
                  {/* Nút tải về (nếu có file) */}
                  {item.fileName && (
                    <a
                      href={item.thumbnail || "#"}
                      download={item.fileName}
                      className="text-green-700 font-semibold text-sm ml-2 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Tải về
                    </a>
                  )}
                </div>
              ) : (
                <span className="text-gray-400">Không có file</span>
              ),
          },
          {
            key: "title",
            label: "Tiêu đề",
            render: (item) => <span>{item.title}</span>,
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
          <Link to={`/file/${item.id}`}>
            <button className="text-blue-600 cursor-pointer text-2xl">
              <RiEditLine />
            </button>
          </Link>
        )}
      />

      {/* Modal thêm bài viết */}
      <AddFileModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleAddDocument}
        tags={["Hướng dẫn", "Biểu mẫu", "Quy trình", "Khác"]}
      />
    </div>
  );
}
