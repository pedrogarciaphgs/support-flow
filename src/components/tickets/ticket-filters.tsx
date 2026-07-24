"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Filter, Search, X } from "lucide-react";

export function TicketFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const defaultSearch = searchParams.get("search") ?? "";
  const defaultStatus = searchParams.get("status") ?? "";
  const defaultPriority = searchParams.get("priority") ?? "";

  function handleSubmit(formData: FormData) {
    const params = new URLSearchParams();

    const search = formData.get("search")?.toString().trim();
    const status = formData.get("status")?.toString();
    const priority = formData.get("priority")?.toString();

    if (search) {
      params.set("search", search);
    }

    if (status) {
      params.set("status", status);
    }

    if (priority) {
      params.set("priority", priority);
    }

    const queryString = params.toString();

    router.push(queryString ? `/tickets?${queryString}` : "/tickets");
  }

  function clearFilters() {
    router.push("/tickets");
  }

  const hasFilters =
    Boolean(defaultSearch) ||
    Boolean(defaultStatus) ||
    Boolean(defaultPriority);

  return (
    <form
      action={handleSubmit}
      className="flex flex-col gap-4 border-b border-slate-200 p-6"
    >
      <div className="flex flex-col gap-4 xl:flex-row">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="search"
            name="search"
            defaultValue={defaultSearch}
            placeholder="Buscar por título, descrição ou solicitante..."
            className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <select
          name="status"
          defaultValue={defaultStatus}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-500"
        >
          <option value="">Todos os status</option>
          <option value="OPEN">Aberto</option>
          <option value="IN_PROGRESS">Em andamento</option>
          <option value="RESOLVED">Resolvido</option>
          <option value="CLOSED">Fechado</option>
        </select>

        <select
          name="priority"
          defaultValue={defaultPriority}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-500"
        >
          <option value="">Todas as prioridades</option>
          <option value="LOW">Baixa</option>
          <option value="MEDIUM">Média</option>
          <option value="HIGH">Alta</option>
          <option value="URGENT">Urgente</option>
        </select>

        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
        >
          <Filter size={18} />
          Filtrar
        </button>

        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            <X size={18} />
            Limpar
          </button>
        )}
      </div>
    </form>
  );
}
