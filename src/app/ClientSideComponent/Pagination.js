"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

function PageNavigator({ totalPages, backendCurrentPage }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(backendCurrentPage || 1);
  const numberOfPages = [];
  for (let i = 1; i <= totalPages; i++) {
    numberOfPages.push(i);
  }

  const handleCurrentPage = (numberOfPage) => {
    setCurrentPage(numberOfPage);
    router.push(`/home?page=${numberOfPage}`);
  };

  return (
    <>
      <nav aria-label="Page navigation example">
        <ul className="flex items-center -space-x-px h-10 text-md justify-center">
          <li className="cursor-pointer">
            <button
              className={
                "flex items-center justify-center px-3 py-1 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              }
              disabled={backendCurrentPage === 1}
              onClick={() => {
                router.push(`/home?page=${backendCurrentPage - 1}`);
              }}
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-2.5 h-2.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={"2"}
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </button>
          </li>
          {numberOfPages.length > 0 &&
            numberOfPages.map((numberOfPage) => {
              if (
                numberOfPage >= backendCurrentPage - 3 &&
                numberOfPage <= backendCurrentPage + 3
              ) {
                return (
                  <button key={numberOfPage}>
                    <a
                      onClick={() => handleCurrentPage(numberOfPage)}
                      className={
                        numberOfPage === backendCurrentPage
                          ? "bg-[#0b4f79] !important flex items-center justify-center px-3 h-8 leading-tight text-white  border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                          : "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      }
                    >
                      {numberOfPage}
                    </a>
                  </button>
                );
              }
            })}

          <li className="cursor-pointer">
            <button
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => {
                router.push(`/home?page=${backendCurrentPage + 1}`);
              }}
              disabled={backendCurrentPage === totalPages}
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-2.5 h-2.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default PageNavigator;
