import React, { useEffect, useRef, useState } from "react";
import Editor from "../../resuable/Editor";
import Tag from "../../ui/Tag";
import ImgDropZone from "../../ui/AddImgDropZone";

export type NewFile = {
  title: string;
  tag: string;
  status: "Published" | "Draft";
  description: string;
};

type AddPostModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: NewFile) => void;
  tags: string[];
};

export default function AddFileModal({
  isOpen,
  onClose,
  onSubmit,
  tags,
}: AddPostModalProps) {
  const [form, setForm] = useState<NewFile>({
    title: "",
    tag: tags[0] ?? "",
    status: "Draft",
    description: "",
  });
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const panelRef = useRef<HTMLDivElement>(null);

  // đóng khi bấm ESC
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // reset khi mở lại
  useEffect(() => {
    if (isOpen) {
      setForm({
        title: "",
        tag: tags[0] ?? "",
        status: "Draft",
        description: "",
      });
    }
  }, [isOpen, tags]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSubmit(form);
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 ${isOpen ? "flex" : "hidden"} items-center justify-center `}
      role="dialog"
      aria-modal="true"
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* panel */}
      <div
        ref={panelRef}
        className="relative w-full mx-auto bg-white rounded-lg shadow-lg overflow-y-auto max-h-[90vh] max-w-3xl "
      >
        {/* header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 rounded-t">
          <h3 className="text-lg font-semibold text-gray-900">Tạo file mới</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg w-8 h-8 inline-flex items-center justify-center"
            aria-label="Đóng"
          >
            <svg className="w-4 h-4" viewBox="0 0 14 14" fill="none">
              <path
                d="M1 1l12 12M13 1 1 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* body */}
        <form className="p-4" onSubmit={submit}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="col-span-2">
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Tiêu đề
              </label>
              <input
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Nhập tiêu đề tài liệu "
                required
                className="w-full p-2.5 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                type="text"
              />
            </div>

            <div className="col-span-2 ">
              <label
                htmlFor="tag"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Tag
              </label>
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
            </div>

            {/* <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="status"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Trạng thái
              </label>
              <select
                id="status"
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full p-2.5 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>
            </div> */}
            <h1 className="block text-md font-medium text-gray-900">File</h1>
            <div className="col-span-2">
              <ImgDropZone
                onChange={handleImageChange}
                file={imageFile}
                previewUrl={imagePreview}
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-gray-100 pt-4 px-1 pb-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
            >
              Tạo file
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
