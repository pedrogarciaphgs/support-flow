import { Sidebar } from "@/components/layout/sidebar";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, ShieldCheck, UserRound, UsersRound } from "lucide-react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

function formatRole(role: string) {
  const labels = {
    ADMIN: "Administrador",
    AGENT: "Atendente",
    USER: "Usuário",
  };

  return labels[role as keyof typeof labels] ?? role;
}

function getRoleStyle(role: string) {
  switch (role) {
    case "ADMIN":
      return "bg-purple-100 text-purple-700";

    case "AGENT":
      return "bg-indigo-100 text-indigo-700";

    default:
      return "bg-slate-100 text-slate-700";
  }
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("pt-PT", {
    dateStyle: "short",
  }).format(date);
}

export default async function UsersPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },

    include: {
      _count: {
        select: {
          createdTickets: true,
          assignedTickets: true,
          comments: true,
        },
      },
    },
  });

  const totalUsers = users.length;

  const totalAgents = users.filter((user) => user.role === "AGENT").length;

  const totalAdmins = users.filter((user) => user.role === "ADMIN").length;

  return (
    <main className="flex min-h-screen bg-slate-100">
      <Sidebar
        user={{
          name: session.user.name ?? "Usuário",
          role: session.user.role,
        }}
      />

      <section className="min-w-0 flex-1">
        <header className="border-b border-slate-200 bg-white px-8 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Usuários</h1>

              <p className="text-sm text-slate-500">
                Gerencie os usuários cadastrados no sistema
              </p>
            </div>

            {session.user.role === "ADMIN" && (
              <Link
                href="/users/new"
                className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
              >
                <Plus size={18} />
                Novo usuário
              </Link>
            )}
          </div>
        </header>

        <div className="p-8">
          <div className="grid gap-5 md:grid-cols-3">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Total de usuários
                  </p>

                  <strong className="mt-2 block text-3xl text-slate-900">
                    {totalUsers}
                  </strong>
                </div>

                <div className="rounded-xl bg-slate-100 p-3 text-slate-600">
                  <UsersRound size={22} />
                </div>
              </div>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Atendentes
                  </p>

                  <strong className="mt-2 block text-3xl text-slate-900">
                    {totalAgents}
                  </strong>
                </div>

                <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
                  <UserRound size={22} />
                </div>
              </div>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Administradores
                  </p>

                  <strong className="mt-2 block text-3xl text-slate-900">
                    {totalAdmins}
                  </strong>
                </div>

                <div className="rounded-xl bg-purple-100 p-3 text-purple-600">
                  <ShieldCheck size={22} />
                </div>
              </div>
            </article>
          </div>

          <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-5">
              <h2 className="text-lg font-semibold text-slate-900">
                Usuários cadastrados
              </h2>

              <p className="text-sm text-slate-500">
                Informações e atividade dos usuários do sistema
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-6 py-4 font-medium">Usuário</th>

                    <th className="px-6 py-4 font-medium">Perfil</th>

                    <th className="px-6 py-4 font-medium">Chamados criados</th>

                    <th className="px-6 py-4 font-medium">
                      Chamados atribuídos
                    </th>

                    <th className="px-6 py-4 font-medium">Comentários</th>

                    <th className="px-6 py-4 font-medium">Cadastrado em</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {users.map((user) => (
                    <tr key={user.id} className="transition hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                            <UserRound size={19} />
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-slate-900">
                              {user.name}
                            </p>

                            <p className="text-xs text-slate-500">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getRoleStyle(
                            user.role,
                          )}`}
                        >
                          {formatRole(user.role)}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {user._count.createdTickets}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {user._count.assignedTickets}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {user._count.comments}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-500">
                        {formatDate(user.createdAt)}
                      </td>
                    </tr>
                  ))}

                  {users.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-10 text-center text-sm text-slate-500"
                      >
                        Nenhum usuário cadastrado.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
