"use client";

import Link from "next/link";

import { Save } from "lucide-react";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { createTicket, type CreateTicketState } from "@/actions/create-ticket";

const initialState: CreateTicketState = {
  success: false,
  message: "",
};

export function CreateTicketForm() {
  const router = useRouter();

  const [state, formAction, pending] = useActionState(
    createTicket,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      router.push("/tickets");
    }
  }, [state, router]);

  return (
    <form
      action={formAction}
      className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="grid gap-6">
        {state.message && !state.success && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {state.message}
          </div>
        )}

        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Título
          </label>

          <input
            id="title"
            name="title"
            type="text"
            required
            minLength={5}
            maxLength={100}
            placeholder="Ex.: Erro ao acessar o sistema"
            className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Descrição
          </label>

          <textarea
            id="description"
            name="description"
            rows={6}
            required
            minLength={10}
            maxLength={2000}
            placeholder="Descreva o problema com o máximo de detalhes possível..."
            className="w-full resize-none rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="priority"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Prioridade
            </label>

            <select
              id="priority"
              name="priority"
              required
              defaultValue=""
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="" disabled>
                Selecione a prioridade
              </option>
              <option value="LOW">Baixa</option>
              <option value="MEDIUM">Média</option>
              <option value="HIGH">Alta</option>
              <option value="URGENT">Urgente</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Categoria
            </label>

            <select
              id="category"
              name="category"
              required
              defaultValue=""
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="" disabled>
                Selecione uma categoria
              </option>
              <option value="ACCESS">Acesso</option>
              <option value="HARDWARE">Hardware</option>
              <option value="SOFTWARE">Software</option>
              <option value="NETWORK">Rede</option>
              <option value="OTHER">Outro</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-200 pt-6">
          <Link
            href="/tickets"
            className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            Cancelar
          </Link>

          <button
            type="submit"
            disabled={pending}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save size={18} />
            {pending ? "Criando..." : "Criar chamado"}
          </button>
        </div>
      </div>
    </form>
  );
}
