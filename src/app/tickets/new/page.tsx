import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

import { Sidebar } from "@/components/layout/sidebar";

export default function NewTicketPage() {
  return (
    <main className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <section className="min-w-0 flex-1">
        <header className="border-b border-slate-200 bg-white px-8 py-5">
          <div className="flex items-center gap-4">
            <Link
              href="/tickets"
              className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100"
            >
              <ArrowLeft size={20} />
            </Link>

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Novo chamado
              </h1>

              <p className="text-sm text-slate-500">
                Registre uma nova solicitação de suporte
              </p>
            </div>
          </div>
        </header>

        <div className="p-8">
          <form className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid gap-6">
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

              <div>
                <label
                  htmlFor="requester"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Solicitante
                </label>

                <input
                  id="requester"
                  name="requester"
                  type="text"
                  placeholder="Nome do solicitante"
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
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
                  className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
                >
                  <Save size={18} />
                  Criar chamado
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
