import { useState } from "react";

type PaginationProps <T> = {
  elementsPerPage: number;
  elements: T[];
};

export const usePagination = <T,>({
  elementsPerPage,
  elements,
}: PaginationProps <T>) => {
  const [toShow, setToShow] = useState<T[]>(elements.slice(0, elementsPerPage));
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(elements.length / elementsPerPage);

  const handlePageChange = (page: number) => {
    const start = (page - 1) * elementsPerPage;
    const end = start + elementsPerPage;

    setToShow(elements.slice(start, end));
    setCurrentPage(page);
  };

  return {
    toShow,
    currentPage,
    totalPages,
    handlePageChange,
  };
};
