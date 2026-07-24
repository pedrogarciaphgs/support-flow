"use client";

import { useActionState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";

import {
  createComment,
  type CreateCommentState,
} from "@/actions/create-comment";

const initialState: CreateCommentState = {
  success: false,
  message: "",
};

type CreateCommentFormProps = {
  ticketId: string;
};

export function CreateCommentForm({ ticketId }: CreateCommentFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, pending] = useActionState(
    createComment,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="border-t border-slate-200 pt-6"
    >
      <input type="hidden" name="ticketId" value={ticketId} />

      {state.message && !state.success && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.message}
        </div>
      )}

      <label
        htmlFor="content"
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        Adicionar comentário
      </label>

      <textarea
        id="content"
        name="content"
        rows={4}
        required
        minLength={3}
        maxLength={1000}
        placeholder="Escreva uma atualização sobre o chamado..."
        className="w-full resize-none rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
      />

      <div className="mt-3 flex justify-end">
        <button
          type="submit"
          disabled={pending}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Send size={17} />

          {pending ? "Enviando..." : "Enviar comentário"}
        </button>
      </div>
    </form>
  );
}
