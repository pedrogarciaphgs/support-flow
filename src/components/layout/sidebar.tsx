"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CircleUserRound,
  LayoutDashboard,
  Settings,
  TicketCheck,
  Users,
} from "lucide-react";

import { LogoutButton } from "@/components/auth/logout-button";

type UserRole = "ADMIN" | "AGENT" | "USER";

type SidebarProps = {
  user: {
    name: string;
    role: UserRole;
  };
};

type MenuItem = {
  label: string;
  icon: React.ElementType;
  href: string;
  allowedRoles?: UserRole[];
};

const menuItems: MenuItem[] = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    label: "Chamados",
    icon: TicketCheck,
    href: "/tickets",
  },
  {
    label: "Usuários",
    icon: Users,
    href: "/users",
    allowedRoles: ["ADMIN"],
  },
  {
    label: "Configurações",
    icon: Settings,
    href: "/settings",
  },
];

function formatRole(role: UserRole) {
  const labels: Record<UserRole, string> = {
    ADMIN: "Administrador",
    AGENT: "Atendente",
    USER: "Usuário",
  };

  return labels[role];
}

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();

  const visibleMenuItems = menuItems.filter((item) => {
    if (!item.allowedRoles) {
      return true;
    }

    return item.allowedRoles.includes(user.role);
  });

  return (
    <aside className="flex min-h-screen w-64 shrink-0 flex-col bg-slate-950 px-4 py-6 text-white">
      <div className="mb-10 flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600">
          <TicketCheck size={22} />
        </div>

        <span className="text-xl font-bold">SupportFlow</span>
      </div>

      <div className="mb-8 flex items-center gap-3 rounded-xl bg-slate-900 p-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-700">
          <CircleUserRound size={22} />
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{user.name}</p>

          <span className="text-xs text-indigo-300">
            {formatRole(user.role)}
          </span>
        </div>
      </div>

      <nav className="space-y-2">
        {visibleMenuItems.map(({ label, icon: Icon, href }) => {
          const isActive =
            href === "/" ? pathname === "/" : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm transition ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "text-slate-300 hover:bg-slate-900 hover:text-white"
              }`}
            >
              <Icon size={19} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6">
        <LogoutButton />
      </div>
    </aside>
  );
}
