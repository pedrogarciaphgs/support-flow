"use client";

import { useActionState, useEffect } from "react";
import { KeyRound } from "lucide-react";
import { toast } from "sonner";

import {
  changePassword,
  type ChangePasswordState,
} from "@/actions/change-password";

const initialState: ChangePasswordState = {
  success: false,
  message: "",
};

export function ChangePasswordForm() {
  const [state, formAction, pending] = useActionState(
    changePassword,
    initialState,
  );

  useEffect(() => {
    if (!state.message) {
      return;
    }

    if (state.success) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
          <KeyRound size={22} />
        </div>

        <div>
          <h2 className="font-semibold text-slate-900">Alterar senha</h2>

          <p className="text-sm text-slate-500">
            Atualize a senha utilizada para entrar no sistema
          </p>
        </div>
      </div>

      <form action={formAction} className="space-y-4">
        <div>
          <label
            htmlFor="currentPassword"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Senha atual
          </label>

          <input
            id="currentPassword"
            name="currentPassword"
            type="password"
            required
            autoComplete="current-password"
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <div>
          <label
            htmlFor="newPassword"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Nova senha
          </label>

          <input
            id="newPassword"
            name="newPassword"
            type="password"
            minLength={6}
            required
            autoComplete="new-password"
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Confirmar nova senha
          </label>

          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            minLength={6}
            required
            autoComplete="new-password"
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Alterando..." : "Alterar senha"}
        </button>
      </form>
    </div>
  );
}
