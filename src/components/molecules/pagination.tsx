import { P } from "drizzle-orm/db.d-a6fe1b19";
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
    const ps = [];
    for (let i = 1; i <= totalPages; i++) {
      ps.push(i);
    }
    setPages(ps);
  }, [totalPages]);

  return (
    <div className="flex justify-center items-center m-10">
      <button
        className="flex items-center justify-center rounded-full w-12 h-12 cursor-pointer"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        {'<'}
      </button>
      {pages.map((p) => {
        return (
          <button
            key={p}  
            className="flex items-center justify-center rounded-full w-8 h-8 mx-1"
            onClick={() => onPageChange(p)}
          >
            {p}
          </button>
        );
      })}
      <button
        className="flex items-center justify-center rounded-full w-12 h-12 cursor-pointer"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        {'>'}
      </button>
    </div>
  );
};
