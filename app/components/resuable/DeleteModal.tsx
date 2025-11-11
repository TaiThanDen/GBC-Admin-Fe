import React from "react";

interface DeleteModalProps {
  item: any;
  onClose: () => void;
  onConfirm?: () => void; // Thêm prop này
}

const DeleteModal = ({ item, onClose, onConfirm }: DeleteModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg p-6 min-w-[320px]">
        <h3 className="font-bold text-gray-800 mb-2">Xác nhận xóa</h3>
        <p className="mb-4">
          Bạn có chắc muốn xóa{" "}
          <span className="font-semibold">{item?.title || "item"}</span>?
        </p>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="py-2 px-3 rounded bg-gray-200 text-gray-800 hover:bg-gray-300"
            onClick={onClose}
          >
            Đóng
          </button>
          <button
            type="button"
            className="py-2 px-3 rounded bg-red-600 text-white hover:bg-red-700"
            onClick={onConfirm}
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
