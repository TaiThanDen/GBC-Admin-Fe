import React, { useState } from "react";
import { RiEditLine } from "react-icons/ri";
import { MdDelete } from "react-icons/md";

interface Post {
  id: number;
  title: string;
  tag: string;
  author: string;
  date: string;
  status: "Published" | "Draft";
}

interface FilterOption {
  label: string;
  value: string;
}

interface PostsTableProps {
  posts: Post[];
  filters: FilterOption[];
  onFilterChange?: (value: string) => void;
}

export default function PostsTable({
  posts,
  filters,
  onFilterChange,
}: PostsTableProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(filters[0]?.value || "");

  const handleSelect = (value: string) => {
    setSelectedFilter(value);
    setShowDropdown(false);
    onFilterChange?.(value);
  };

  return (
    <div className="relative shadow-md sm:rounded-lg">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between pb-4 gap-4 bg-gray-600">
        <div className="relative ">
          <button
            type="button"
            className="inline-flex items-center text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 "
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
            placeholder="Tìm kiếm bài viết..."
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
            <th className="px-6 py-3">Title</th>
            <th className="px-6 py-3">Tag</th>
            <th className="px-6 py-3">Publication Date</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {posts.map((post) => (
            <tr
              key={post.id}
              className="bg-white border-b hover:bg-gray-50 border-gray-200"
            >
              <td className="w-4 p-4">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500"
                />
              </td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {post.title}
              </th>
              <td className="px-6 py-4">{post.tag}</td>
              <td className="px-6 py-4">{post.author}</td>
              <td className="px-6 py-4">{post.date}</td>
              <td className="px-6 py-4">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    post.status === "Published"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {post.status}
                </span>
              </td>
              <td className="px-6 py-4">
                <td className="px-4 py-4 gap-5 flex items-center">
                  <button className="text-blue-600 cursor-pointer text-2xl">
                    <RiEditLine />
                  </button>
                  <button className="text-red-600 cursor-pointer text-2xl">
                    <MdDelete />
                  </button>
                </td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
