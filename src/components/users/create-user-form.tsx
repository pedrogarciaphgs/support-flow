"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { Save } from "lucide-react";
import { toast } from "sonner";

import { createUser, type CreateUserState } from "@/actions/create-user";

const initialState: CreateUserState = {
  success: false,
  message: "",
};

export function CreateUserForm() {
  const router = useRouter();

  const [state, formAction, pending] = useActionState(createUser, initialState);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      router.push("/users");
    }
  }, [state, router]);

  return (
    <form
      action={formAction}
      className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="grid gap-6">
        {state.message && !state.success && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {state.message}
          </div>
        )}

        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Nome
          </label>

          <input
            id="name"
            name="name"
            type="text"
            required
            minLength={3}
            maxLength={100}
            placeholder="Nome completo"
            className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="usuario@supportflow.dev"
            className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Senha
          </label>

          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={6}
            maxLength={100}
            placeholder="Mínimo de 6 caracteres"
            className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <div>
          <label
            htmlFor="role"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Perfil
          </label>

          <select
            id="role"
            name="role"
            required
            defaultValue="USER"
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="USER">Usuário</option>
            <option value="AGENT">Atendente</option>
            <option value="ADMIN">Administrador</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-200 pt-6">
          <Link
            href="/users"
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

            {pending ? "Criando..." : "Criar usuário"}
          </button>
        </div>
      </div>
    </form>
  );
}
