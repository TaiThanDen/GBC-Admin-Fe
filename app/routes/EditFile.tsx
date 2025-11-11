import React, { useState } from "react";
import Tag from "~/components/ui/Tag";
import Editor from "~/components/resuable/Editor";
import AddImgDropZone from "~/components/ui/AddImgDropZone";
import { useParams } from "react-router";

const tags = ["Tech", "Life", "Business"];

export function loader() {
  return {};
}

type EditorPostsProps = {
  onClose: () => void;
};

const EditDocument = ({ onClose }: EditorPostsProps) => {
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState({
    title: "",
    tag: tags[0] ?? "",
    description: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      if (file.type.startsWith("image")) {
        setImagePreview(URL.createObjectURL(file));
      } else {
        setImagePreview(null);
      }
    }
  };

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  return (
    <div className="relative bg-gray-100 h-full w-auto p-4 overflow-auto">
      <h1 className="text-2xl font-bold p-4">Edit File Posts</h1>
      <div className="grid lg:grid-cols-4 sm:grid-cols-1 ">
        <div className="col-span-3 p-4 ">
          <form>
            <h1 className="text-xl text-gray-700 mb-2">Tiêu đề</h1>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full p-3 text-gray-900 bg-white border border-gray-300 rounded-lg mb-4"
              placeholder="Nhập tiêu đề bài viết"
            />
            <h1 className="text-xl text-gray-700 mb-2">Thể loại</h1>
            <Tag
              value={selectedTags}
              onChange={setSelectedTags}
              options={[
                "Nông nghiệp",
                "Công nghệ",
                "Truy xuất nguồn gốc",
                "Tin tức",
                "Hợp tác xã",
              ]}
            />
          </form>
        </div>
        <div className="col-span-1 p-4 pt-13">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">File</h2>
            <AddImgDropZone
              onChange={handleImageChange}
              file={imageFile}
              previewUrl={imagePreview}
            />
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 right-0 w-full bg-white border-t border-gray-200 flex justify-end items-center px-8 py-4 z-50">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 mr-2"
        >
          Hủy
        </button>
        <button
          type="button"
          className="px-5 py-2.5 text-sm rounded-lg bg-green-600 text-white hover:bg-green-700 focus:ring-4 focus:ring-green-300 mr-2"
        >
          Lưu
        </button>
        <button
          type="submit"
          className="px-5 py-2.5 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
        >
          Xuất bản
        </button>
      </div>
    </div>
  );
};

export default EditDocument;
