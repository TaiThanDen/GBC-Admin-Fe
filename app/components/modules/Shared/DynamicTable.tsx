import DeleteModal from "../../resuable/DeleteModal";
import React, { useState } from "react";
import { RiEditLine } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router";

interface Column {
  key: string;
  label: string;
  render?: (item: any) => React.ReactNode;
}

interface FilterOption {
  label: string;
  value: string;
}

interface DynamicTableProps {
  data: any[];
  columns: Column[];
  filters?: FilterOption[];
  onFilterChange?: (value: string) => void;
  searchPlaceholder?: string;
  renderAction?: (item: any) => React.ReactNode; // Thêm dòng này
}

export default function DynamicTable({
  data,
  columns,
  filters = [],
  onFilterChange,
  searchPlaceholder = "Tìm kiếm...",
  renderAction,
}: DynamicTableProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(filters[0]?.value || "");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState<any>(null);

  const handleSelect = (value: string) => {
    setSelectedFilter(value);
    setShowDropdown(false);
    onFilterChange?.(value);
  };

  const handleDeleteClick = (item: any) => {
    setDeleteItem(item);
    setShowDeleteModal(true);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setDeleteItem(null);
  };

  return (
    <div className="relative shadow-md sm:rounded-lg">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between pb-4 gap-4">
        {filters.length > 0 && (
          <div className="relative">
            <button
              type="button"
              className="inline-flex items-center text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-3 py-1.5"
              onClick={() => setShowDropdown((v) => !v)}
            >
              {filters.find((f) => f.value === selectedFilter)?.label || "Chọn"}
              <svg
                className="w-2.5 h-2.5 ms-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            {showDropdown && (
              <div className="absolute z-10 w-48 bg-white rounded-lg shadow-sm border mt-2">
                <ul className="p-3 space-y-1 text-sm text-gray-700">
                  {filters.map((filter) => (
                    <li key={filter.value}>
                      <button
                        className={`w-full text-left p-2 rounded hover:bg-gray-100 ${
                          selectedFilter === filter.value
                            ? "bg-gray-100 font-bold"
                            : ""
                        }`}
                        onClick={() => handleSelect(filter.value)}
                      >
                        {filter.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder={searchPlaceholder}
          />
        </div>
      </div>

      {/* Table */}
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="p-4">
              <input
                id="checkbox-all"
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500"
              />
            </th>
            {columns.map((col) => (
              <th key={col.key} className="px-6 py-3">
                {col.label}
              </th>
            ))}
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className="bg-white border-b hover:bg-gray-50 border-gray-200"
            >
              <td className="w-4 p-4">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500"
                />
              </td>
              {columns.map((col) => (
                <td key={col.key} className="px-6 py-4">
                  {col.render ? col.render(item) : item[col.key]}
                </td>
              ))}
              <td className="px-4 py-4 gap-5 flex items-center">
                {renderAction
                  ? renderAction(item)
                  : (
                    <Link to={`/post/${item.id}`}>
                      <button className="text-blue-600 cursor-pointer text-2xl">
                        <RiEditLine />
                      </button>
                    </Link>
                  )
                }
                <button
                  className="text-red-600 cursor-pointer text-2xl"
                  onClick={() => handleDeleteClick(item)}
                >
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Delete Modal */}
      {showDeleteModal && (
        <DeleteModal
          item={deleteItem}
          onClose={handleCloseModal}
          // Bạn có thể truyền thêm hàm xử lý xóa ở đây
        />
      )}
    </div>
  );
}
