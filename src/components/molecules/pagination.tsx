import { useEffect, useState } from "react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onPageChange,
}) => {
  const [pages, setPages] = useState<number[]>([]);

  useEffect(() => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    setPages(pages);
  }, [totalPages]);

  return (
    <div className="flex justify-center items-center m-10">
      <button
        className="flex items-center justify-center rounded-full w-8 h-8"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        {'<'}
      </button>
      {pages.map((page) => {
        return (
          <button
            key={page}  
            className="flex items-center justify-center rounded-full w-8 h-8 mx-1"
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        );
      })}
      <button
        className="flex items-center justify-center rounded-full w-8 h-8"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        {'>'}
        {/* <ChevronRightIcon className="w-5 h-5" /> */}
      </button>
    </div>
  );
};
