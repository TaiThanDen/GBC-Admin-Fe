import React, { useState } from "react";
import clsx from "clsx";

interface TagSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
  options: string[];
  placeholder?: string;
}

export default function TagSelect({
  value,
  onChange,
  options,
  placeholder = "Select tags...",
}: TagSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const toggleTag = (tag: string) => {
    if (value.includes(tag)) {
      onChange(value.filter((t) => t !== tag));
    } else {
      onChange([...value, tag]);
    }
  };

  const filtered = options.filter((opt) =>
    opt.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative w-full">
      {/* Toggle area */}
      <div
        onClick={() => setOpen((o) => !o)}
        className="flex flex-wrap items-center gap-2 min-h-[44px] w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 cursor-pointer focus-within:ring-2 focus-within:ring-blue-500"
      >
        {value.length === 0 ? (
          <span className="text-gray-400">{placeholder}</span>
        ) : (
          value.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
            >
              {tag}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(value.filter((t) => t !== tag));
                }}
                className="text-gray-600 hover:text-blue-800"
              >
                ×
              </button>
            </span>
          ))
        )}
        <span className="ml-auto text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={clsx(
              "size-4 transition-transform",
              open ? "rotate-180" : "rotate-0"
            )}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="m7 15 5 5 5-5M7 9l5-5 5 5" />
          </svg>
        </span>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="sticky top-0 bg-white p-2 border-b border-gray-100">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full text-sm border border-gray-200 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="max-h-60 overflow-y-auto p-1">
            {filtered.length > 0 ? (
              filtered.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => toggleTag(opt)}
                  className={clsx(
                    "w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-gray-100",
                    value.includes(opt)
                      ? "bg-blue-100 text-gray-600 font-medium"
                      : "text-gray-800"
                  )}
                >
                  {opt}
                </button>
              ))
            ) : (
              <p className="text-center text-sm text-gray-400 py-2">
                No results
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
