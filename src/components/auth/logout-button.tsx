import { LogOut } from "lucide-react";

import { logout } from "@/actions/logout";

export function LogoutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-slate-300 transition hover:bg-red-950 hover:text-red-300"
      >
        <LogOut size={19} />
        Sair
      </button>
    </form>
  );
}
