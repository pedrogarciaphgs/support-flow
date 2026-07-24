"use client";

import { useActionState, useEffect } from "react";
import { Save } from "lucide-react";
import { toast } from "sonner";

import { updateTicket, type UpdateTicketState } from "@/actions/update-ticket";

const initialState: UpdateTicketState = {
  success: false,
  message: "",
};

type Agent = {
  id: string;
  name: string;
};

type UpdateTicketFormProps = {
  ticketId: string;
  currentStatus: string;
  currentAssignedToId: string | null;
  agents: Agent[];
};

export function UpdateTicketForm({
  ticketId,
  currentStatus,
  currentAssignedToId,
  agents,
}: UpdateTicketFormProps) {
  const [state, formAction, pending] = useActionState(
    updateTicket,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
    }
  }, [state]);

  return (
    <form
      action={formAction}
      className="mt-6 space-y-5 border-t border-slate-200 pt-6"
    >
      <input type="hidden" name="ticketId" value={ticketId} />

      {state.message && !state.success && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.message}
        </div>
      )}

      <div>
        <label
          htmlFor="status"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Alterar status
        </label>

        <select
          id="status"
          name="status"
          defaultValue={currentStatus}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        >
          <option value="OPEN">Aberto</option>
          <option value="IN_PROGRESS">Em andamento</option>
          <option value="RESOLVED">Resolvido</option>
          <option value="CLOSED">Fechado</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="assignedToId"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Atendente responsável
        </label>

        <select
          id="assignedToId"
          name="assignedToId"
          defaultValue={currentAssignedToId ?? ""}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        >
          <option value="">Não atribuído</option>

          {agents.map((agent) => (
            <option key={agent.id} value={agent.id}>
              {agent.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Save size={17} />

        {pending ? "Salvando..." : "Salvar alterações"}
      </button>
    </form>
  );
}
