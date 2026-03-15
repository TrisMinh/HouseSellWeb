import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-2">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
          currentPage === 1
            ? "text-muted-foreground/50 cursor-not-allowed"
            : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
        )}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Page Numbers */}
      {pages.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={page === '...'}
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all duration-300",
            page === currentPage
              ? "bg-primary text-white shadow-md scale-110"
              : page === '...'
              ? "text-muted-foreground cursor-default"
              : "text-foreground hover:bg-primary/10 hover:text-primary hover:scale-105"
          )}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
          currentPage === totalPages
            ? "text-muted-foreground/50 cursor-not-allowed"
            : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
        )}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};
