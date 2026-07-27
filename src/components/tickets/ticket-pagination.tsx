"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

type TicketPaginationProps = {
  currentPage: number;
  totalPages: number;
};

export function TicketPagination({
  currentPage,
  totalPages,
}: TicketPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function changePage(page: number) {
    const params = new URLSearchParams(searchParams.toString());

    if (page <= 1) {
      params.delete("page");
    } else {
      params.set("page", String(page));
    }

    const queryString = params.toString();

    router.push(queryString ? `/tickets?${queryString}` : "/tickets");
  }

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4">
      <p className="text-sm text-slate-500">
        Página {currentPage} de {totalPages}
      </p>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage <= 1}
          className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronLeft size={17} />
          Anterior
        </button>

        <button
          type="button"
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Próxima
          <ChevronRight size={17} />
        </button>
      </div>
    </div>
  );
}
