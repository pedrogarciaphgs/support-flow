"use client";

import { useActionState, useEffect } from "react";
import { UserRoundPen } from "lucide-react";
import { toast } from "sonner";

import {
  updateProfile,
  type UpdateProfileState,
} from "@/actions/update-profile";

type UpdateProfileFormProps = {
  currentName: string;
  email: string;
};

const initialState: UpdateProfileState = {
  success: false,
  message: "",
};

export function UpdateProfileForm({
  currentName,
  email,
}: UpdateProfileFormProps) {
  const [state, formAction, pending] = useActionState(
    updateProfile,
    initialState,
  );

  useEffect(() => {
    if (!state.message) return;

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
          <UserRoundPen size={22} />
        </div>

        <div>
          <h2 className="font-semibold text-slate-900">Editar perfil</h2>

          <p className="text-sm text-slate-500">Atualize seus dados pessoais</p>
        </div>
      </div>

      <form action={formAction} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Nome
          </label>

          <input
            id="name"
            name="name"
            type="text"
            defaultValue={currentName}
            required
            minLength={2}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            E-mail
          </label>

          <input
            id="email"
            type="email"
            value={email}
            disabled
            className="w-full cursor-not-allowed rounded-lg border border-slate-200 bg-slate-100 px-3 py-2.5 text-sm text-slate-500"
          />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Salvando..." : "Salvar alterações"}
        </button>
      </form>
    </div>
  );
}
