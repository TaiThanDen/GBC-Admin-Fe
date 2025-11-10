import React from "react";

type ImgDropZoneProps = {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  file?: File | null;
  previewUrl?: string | null;
};

function getFileIconUrl(file: File) {
  const ext = file.name.split(".").pop()?.toLowerCase();
  if (!ext) return "";
  if (["pdf"].includes(ext))
    return "https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg";
  if (["doc", "docx"].includes(ext))
    return "https://upload.wikimedia.org/wikipedia/commons/e/e8/Microsoft_Office_Word_%282025%E2%80%93present%29.svg";
  if (["xls", "xlsx"].includes(ext))
    return "https://upload.wikimedia.org/wikipedia/commons/6/60/Microsoft_Office_Excel_%282025%E2%80%93present%29.svg";
  return "https://upload.wikimedia.org/wikipedia/commons/8/87/File_icon.svg";
}

export default function AddImgDropZone({
  onChange,
  file,
  previewUrl,
}: ImgDropZoneProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            SVG, PNG, JPG, GIF, PDF, DOCX... (MAX. 800x400px)
          </p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={onChange}
        />
      </label>
      {/* Preview area */}
      {file && (
        <div className="mt-4 w-full flex flex-col items-center">
          <span className="block mb-2 text-sm text-gray-600">Preview:</span>
          {previewUrl && file.type.startsWith("image") ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-auto rounded-lg object-cover"
              style={{ maxHeight: 300 }}
            />
          ) : (
            <div className="flex items-center justify-between w-full p-3 rounded-lg bg-gray-50 border hover:bg-green-50 transition">
              <img
                src={getFileIconUrl(file)}
                alt="File icon"
                className="w-12 h-12 object-cover rounded-md mr-4"
              />
              <span className="text-sm text-gray-800 flex-1 truncate">
                {file.name}
              </span>
              <a
                href={URL.createObjectURL(file)}
                download={file.name}
                className="text-green-700 font-semibold text-sm ml-4 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Tải về
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
