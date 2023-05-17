import { useEffect, useState } from 'react';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onPageChange }) => {
  const [pages, setPages] = useState<number[]>([]);

  useEffect(() => {
    const p = [];
    for (let i = 1; i <= totalPages; i++) {
      p.push(i);
    }
    setPages(p);
  }, [totalPages]);

  return (
    <div className="m-10 flex items-center justify-center">
      <button
        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        {'<'}
      </button>
      {pages.map((p) => {
        return (
          <button
            key={p}
            className="mx-1 flex h-8 w-8 items-center justify-center rounded-full"
            onClick={() => onPageChange(p)}
          >
            {p}
          </button>
        );
      })}
      <button
        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        {'>'}
      </button>
    </div>
  );
};
