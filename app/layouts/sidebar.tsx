import { useState } from "react";
import { MdOutlineLogout } from "react-icons/md";
import { HiOutlineBars3BottomLeft, HiOutlineBookOpen } from "react-icons/hi2";
import { IoNewspaperOutline } from "react-icons/io5";
import { AiOutlineDashboard } from "react-icons/ai";
import { Link } from "react-router";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false); // mobile
  const [mini, setMini] = useState(false); // desktop
  const [accountOpen, setAccountOpen] = useState(false); // dropdown
  const [footerDropdown, setFooterDropdown] = useState(false); // footer dropdown

  return (
    <>
      {/* Mobile toggle */}
      <div className="lg:hidden py-4 text-center">
        <button
          type="button"
          className="py-2 px-3 inline-flex items-center gap-x-2 text-gray-500 text-3xl font-medium rounded-lg hover:bg-gray-100"
          onClick={() => setCollapsed(true)}
        >
          <HiOutlineBars3BottomLeft />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 bottom-0 z-60 bg-white border-e border-gray-200 overflow-x-hidden h-full
          transition-all duration-300
          ${collapsed ? "translate-x-0" : "-translate-x-full"}
          ${mini ? "lg:w-20" : "lg:w-64"}
          lg:translate-x-0 lg:static lg:block
        `}
        role="dialog"
        tabIndex={-1}
        aria-label="Sidebar"
      >
        <div className="relative flex flex-col h-full max-h-full">
          {/* Header */}
          <header className="py-4 px-2 flex justify-between items-center">
            <span
              className={`font-semibold text-xl text-black transition-all duration-300 ${mini ? "lg:hidden" : ""}`}
            >
              Brand
            </span>
            {/* Close Button (Mobile) */}
            <div className="lg:hidden">
              <button
                type="button"
                onClick={() => setCollapsed(false)}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
                aria-label="Close sidebar"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            {/* Mini toggle (Desktop) */}
            <div className="hidden pl-4 lg:block">
              <button
                type="button"
                onClick={() => setMini((v) => !v)}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
                aria-label="Toggle mini sidebar"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={
                      mini ? "M4 6h16M4 12h16M4 18h16" : "M6 18L18 6M6 6l12 12"
                    }
                  />
                </svg>
              </button>
            </div>
          </header>

          {/* Body */}
          <nav className="flex-1 overflow-y-auto px-2">
            <ul className="space-y-1">
              <li>
                <a
                  className={`flex items-center gap-x-3 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 transition-all duration-300 ${mini ? "justify-center" : ""}`}
                  href="#"
                >
                  <AiOutlineDashboard className="text-2xl" />
                  {!mini && "Dashboard"}
                </a>
              </li>
              <li>
                <Link
                  className={`flex items-center gap-x-3 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 transition-all duration-300 ${mini ? "justify-center" : ""}`}
                  to="news"
                >
                  <IoNewspaperOutline className="text-2xl" />
                  {!mini && "Bài viết"}
                </Link>
              </li>
              {/* <li>
                <a
                  className={`flex items-center gap-x-3 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 transition-all duration-300 ${mini ? "justify-center" : ""}`}
                  href="#"
                >
                  <svg
                    className="size-4 shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                  {!mini && "Documentation"}
                </a>
              </li> */}
              {/* Dropdown Document */}
              <li>
                <button
                  type="button"
                  className={`w-full flex items-center gap-x-3 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 transition-all duration-300 ${mini ? "justify-center" : ""}`}
                  onClick={() => setAccountOpen((v) => !v)}
                  aria-expanded={accountOpen}
                >
                  <HiOutlineBookOpen className="text-2xl" />
                  {!mini && "Documents"}
                  {!mini && (
                    <svg
                      className={`ms-auto w-4 h-4 text-gray-600 transition-transform duration-300 ${accountOpen ? "rotate-180" : ""}`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m6 9 6 6 6-6"
                      />
                    </svg>
                  )}
                </button>
                {/* Dropdown content */}
                {!mini && (
                  <div
                    className={`overflow-hidden transition-[max-height] duration-300 ${accountOpen ? "max-h-40" : "max-h-0"}`}
                  >
                    <ul className="pt-1 ps-7 space-y-1">
                      <li>
                        <Link
                          className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100"
                          to="document"
                        >
                          Tài liệu
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100"
                          to="files"
                        >
                          Files
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100"
                          to="videos"
                        >
                          Videos
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            </ul>
          </nav>

          {/* Footer */}
          <footer className="mt-auto p-2 border-t border-gray-200 ">
            <div className="relative w-full inline-flex justify-center items-center hover:bg-gray-100 rounded-2xl ">
              <MdOutlineLogout />
              <a
                className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 "
                href="#"
              >
                {!mini && "Sign out"}
              </a>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
