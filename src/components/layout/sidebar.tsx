import {
  ChartNoAxesCombined,
  CircleUserRound,
  LayoutDashboard,
  Settings,
  TicketCheck,
  Users,
} from "lucide-react";

const menuItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Chamados",
    icon: TicketCheck,
  },
  {
    label: "Usuários",
    icon: Users,
  },
  {
    label: "Relatórios",
    icon: ChartNoAxesCombined,
  },
  {
    label: "Configurações",
    icon: Settings,
  },
];

export function Sidebar() {
  return (
    <aside className="flex min-h-screen w-64 flex-col bg-slate-950 px-4 py-6 text-white">
      <div className="mb-10 flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600">
          <TicketCheck size={22} />
        </div>

        <span className="text-xl font-bold">SupportFlow</span>
      </div>

      <div className="mb-8 flex items-center gap-3 rounded-xl bg-slate-900 p-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-700">
          <CircleUserRound size={22} />
        </div>

        <div>
          <p className="text-sm font-semibold">Pedro Garcia</p>
          <span className="text-xs text-indigo-300">ADMIN</span>
        </div>
      </div>

      <nav className="space-y-2">
        {menuItems.map(({ label, icon: Icon }, index) => (
          <button
            key={label}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm transition ${
              index === 0
                ? "bg-indigo-600 text-white"
                : "text-slate-300 hover:bg-slate-900 hover:text-white"
            }`}
          >
            <Icon size={19} />
            {label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
